import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CITY_COORDINATES } from '@app/features/map/city-coordinates';
import { FeatureCollection } from '@app/features/map/models/feature-collection.model';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { MapFeaturesService } from '@app/features/map/services/map-features.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { Subscription } from 'rxjs';

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
    mapStyle = 'mapbox://styles/mapbox/outdoors-v9';
    // mapStyle = 'mapbox://styles/mapbox/streets-v9';
    mapZoom = [13];
    mapCenter;
    mapLng;
    mapLat;

    // ---
    message = 'Hello World!';
    // data
    source: any;
    markers$;

    // constructor(private route: ActivatedRouteSnapshot,  private state: RouterStateSnapshot) {
    constructor(private mapService: MapFeaturesService,
                private route: ActivatedRoute) {
        // const parentRouteId = state.parent(route).params['id'];
    }

    ngOnInit() {
        this.mapCenter = CITY_COORDINATES.praha;

        this.markers$ = this.mapService.getMarkers$();

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
            this.mapService.selectedMarker$
                .subscribe(
                    marker => {
                        if (marker && marker.geometry) {
                            this.mapCenter = marker.geometry.coordinates;
                        }
                    }
                )
        ];
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(s => s.unsubscribe());
    }

    onClick(event: MapMouseEvent) {
        if (event.lngLat) {
            const coordinates: LngLatLike = event.lngLat;
            // const newMarker = new GeoJsonFeature(coordinates, { message: this.message });
            const newMarker = new GeoJsonFeature([coordinates.lng, coordinates.lat], { message: this.message });
            this.mapService.createMarker(newMarker);
            // this.store.dispatch(new fromMap.UpsertMapFeature({ mapFeature: newMarker }));
            // console.log(event);
        }
    }

    onLoad(event: any) {
        this.map = event;
        // this.currentGeoLocation();
        return;

        // TODO: add layers etc.
        /// register source
        this.map.addSource('firebase', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        /// get source
        this.source = this.map.getSource('firebase');

        /// subscribe to realtime database and set data source
        // this.markers.snapshotChanges().subscribe(markers => {
        //     let data = new FeatureCollection(markers);
        //     this.source.setData(data);
        // });

        /// create map layers with realtime data
        this.map.addLayer({
            id: 'firebase',
            source: 'firebase',
            type: 'symbol',
            layout: {
                'text-field': '{message}',
                'text-size': 24,
                'text-transform': 'uppercase',
                'icon-image': 'rocket-15',
                'text-offset': [0, 1.5]
            },
            paint: {
                'text-color': '#f16624',
                'text-halo-color': '#fff',
                'text-halo-width': 2
            }
        })
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
                this.mapLat = position.coords.latitude;
                this.mapLng = position.coords.longitude;
                this.map.flyTo({
                    center: [this.mapLng, this.mapLat]
                })
            });
        }
    }
}
