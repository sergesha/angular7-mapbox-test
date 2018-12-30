import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CITY_COORDINATES } from '@app/features/map/city-coordinates';
import { FeatureCollection } from '@app/features/map/models/feature-collection.model';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { MapFeaturesService } from '@app/features/map/services/map-features.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {
    id;
    subscriptions$: Subscription[];
    /// default settings
    map: mapboxgl.Map;
    mapStyle = 'mapbox://styles/mapbox/streets-v10';
    mapZoom = [5];
    mapCenter;
    mapLng;
    mapLat;
    overFeature = false;

    // ---
    message = 'Hello World!';
    // data
    // source: any;

    // markers$: Observable<GeoJsonFeature[]>;
    markersCollection$: Observable<FeatureCollection>;
    visibleLayers$: Observable<{[key: string]: boolean}>;

    selectedPoint: GeoJSON.Feature<GeoJSON.Point> | null;

    // constructor(private route: ActivatedRouteSnapshot,  private state: RouterStateSnapshot) {
    constructor(private mapService: MapFeaturesService,
                private route: ActivatedRoute) {
        // const parentRouteId = state.parent(route).params['id'];
    }

    ngOnInit() {
        this.mapCenter = CITY_COORDINATES.praha;

        // this.markers$ = this.mapService.getFeatures$();
        this.markersCollection$ = this.mapService.getFeatureCollection$();
        this.visibleLayers$ = this.mapService.getVisibleLayers$();

        this.subscriptions$ = [
            this.route.params
                .subscribe(
                    ({ id }: Params) => {
                        this.id = id;
                        // TODO: get city coordinates ?
                        if (CITY_COORDINATES[id]) {
                            this.mapCenter = CITY_COORDINATES[id];
                        }
                    }
                ),
            this.mapService.selectedFeature$
                .subscribe(
                    marker => {
                        if (marker && marker.geometry) {
                            this.mapCenter = marker.geometry.coordinates;
                        }
                    }
                ),
            this.visibleLayers$
                .subscribe(
                    layers => {
                        for (let key of Object.keys(layers)) {
                            const visibility = layers[key] ? 'visible' : 'none';
                            if (this.map) {
                                const prop = this.map.getLayoutProperty(key, 'visibility');
                                if (typeof prop !== 'undefined' && prop !== visibility) {
                                    this.map.setLayoutProperty(key, 'visibility', visibility);
                                }
                            }
                        }
                    }
                )
        ];
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(s => s.unsubscribe());
    }

    onClick(event: MapMouseEvent) {
        if (this.overFeature && (<any>event).features && (<any>event).features[0]) {
            this.selectedPoint = (<any>event).features[0];
            return;
        }
        if (!this.overFeature && event.lngLat) {
            const coordinates: LngLatLike = event.lngLat;
            // const newMarker = new GeoJsonFeature(coordinates, { message: this.message });
            const newMarker = new GeoJsonFeature([coordinates.lng, coordinates.lat], {
                message: this.message,
                description: 'My POI',
                icon: 'triangle'
            });
            this.mapService.createFeature(newMarker);
        }
    }

    onLoad(event: any) {
        this.map = event;
        this.currentGeoLocation();

        this.addFeatureLayer('airports', {
            name: 'name',
            class: 'featureclass',
            link: 'wikipedia'
        }, 'airport');
        this.mapService.showLayer('airports-layer');

        this.addFeatureLayer('ports', {
            name: 'name',
            class: 'featureclass',
            link: 'website'
        }, 'harbor');
        this.mapService.showLayer('ports-layer');
    }

    addFeatureLayer(featureName, featureFields, featureIcon, featureColor?) {
        const map = this.map;
        let overFeature = this.overFeature;

        this.map.addSource(`${featureName}-source`, {
            type: 'geojson',
            data: `assets/${featureName}.geojson`
            // data: {
            //     type: 'FeatureCollection',
            //     features: []
            // }
        });

        /// get source
        // this.source = this.map.getSource('airports');
        //
        // /// subscribe to realtime database and set data source
        // this.markers.subscribe(markers => {
        //     let data = new FeatureCollection(markers)
        //     this.source.setData(data)
        // });

        /// create map layers with realtime data
        this.map.addLayer({
            id: `${featureName}-layer`,
            source: `${featureName}-source`,
            type: 'symbol',
            layout: {
                'text-field': '{name}',
                'text-size': 24,
                'text-transform': 'uppercase',
                'icon-image': `${featureIcon}-15`,
                'icon-size': 2,
                'text-offset': [0, 1.5]
            },
            paint: {
                // 'text-color': `${featureColor}`,
                'text-halo-color': '#fff',
                'text-halo-width': 2
            }
        });

        this.map.on('click', `${featureName}-layer`, function (e) {
            const coordinates = e.features[0].geometry['coordinates'].slice();
            const props = e.features[0].properties;
            const description = `<strong>${props[featureFields.class]}: ${props[featureFields.name]}</strong><p><a href="//${props[featureFields.link]}" target="_blank" title="Opens in a new window">Go to Website</a></p>`;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        this.map.on('mouseenter', `${featureName}-layer`, function () {
            overFeature = true;
            map.getCanvas().style.cursor = 'help';
        });

        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', `${featureName}-layer`, function () {
            overFeature = false;
            map.getCanvas().style.cursor = 'pointer';
        });
    }

    /// Helpers
    private removeMarker(marker) {
        // this.mapService.removeMarker(marker.$key);
    }

    private flyTo(data: GeoJsonFeature) {
        this.map.flyTo({
            center: data.geometry.coordinates
        })
    }

    private coordinatesOf = ({ lng, lat }): LngLatLike => [lng, lat];

    private currentGeoLocation() {
        /// locate the user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.mapLng = position.coords.longitude;
                this.mapLat = position.coords.latitude;
                this.mapCenter = [this.mapLng, this.mapLat];
                // this.map.flyTo({
                //     center: [this.mapLng, this.mapLat]
                // })
            });
        }
    }
}
