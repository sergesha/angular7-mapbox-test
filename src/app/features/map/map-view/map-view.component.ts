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
    mapZoom = [13];
    mapCenter;
    mapLng;
    mapLat;
    overFeature = false;

    // ---
    message = 'Hello World!';
    // data
    source: any;

    // markers$: Observable<GeoJsonFeature[]>;
    markersCollection$: Observable<FeatureCollection>;

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
        // this.map = event;
        // this.currentGeoLocation();
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
