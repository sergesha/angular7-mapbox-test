import { Injectable } from '@angular/core';
import { CITY_COORDINATES } from '@app/features/map/city-coordinates';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { mapSelectors } from '@app/features/map/store/map.selectors';
import { AppState } from '@app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { LngLatLike } from 'mapbox-gl';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromMap from '../store/map.actions';


export let markers = [
    new GeoJsonFeature(CITY_COORDINATES.praha, { message: 'Ahoj, Praha!' }),
    new GeoJsonFeature(CITY_COORDINATES.kaliningrad, { message: 'Привет, Калининград!' }),
];

@Injectable()
export class MapFeaturesService {
    selectedMarker$ = new BehaviorSubject<GeoJsonFeature>(null);

    constructor(private store: Store<AppState>) {
    }

    getMarkers$(): Observable<any> {
        return this.store.pipe(select(mapSelectors.selectMapFeatures));
        // getMarkers$(): Observable<any> {
        //     return of(markers);
        // return this.db.list('/markers')
    }

    getSelectedMarker$(): Observable<GeoJsonFeature> {
        return this.selectedMarker$;
    }

    selectMarker(data: GeoJsonFeature) {
        this.selectedMarker$.next(data);
    }

    createMarker(data: GeoJsonFeature) {
        this.store.dispatch(new fromMap.AddMapFeature({ mapFeature: data }));
        // return this.db.list('/markers')
        // // markers
        //     .push(data);
    }

    removeMarker(id: string) {
        this.store.dispatch(new fromMap.DeleteMapFeature({ id }));
        // return this.db.object('/markers/' + $key).remove()
    }

    flyTo(data: GeoJsonFeature) {
        // this.map.flyTo({
        //     center: data.geometry.coordinates as LngLatLike
        // })
    }
}
