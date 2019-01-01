import { Injectable } from '@angular/core';
import { FeatureCollection } from '@app/features/map/models/feature-collection.model';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { mapSelectors } from '@app/features/map/store/map.selectors';
import { AppState } from '@app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromMap from '../store/map.actions';

@Injectable()
export class MapFeaturesService {
    selectedFeature$ = new BehaviorSubject<GeoJsonFeature>(null);

    constructor(private store: Store<AppState>) {
    }

    getFeatures$(featureClass?: string): Observable<GeoJsonFeature[]> {
        return this.store.pipe(
            select(mapSelectors.selectMapFeatures),
            map(items => items
                .filter(item => !featureClass
                    || (item['properties']
                        && item['properties'].featureclass
                        && item['properties'].featureclass === featureClass))),
        );
    }

    getFeatureCollection$(featureClass?: string): Observable<FeatureCollection> {
        return this.store.pipe(
            select(mapSelectors.selectMapFeatures),
            map(items => items
                .filter(item => !featureClass
                    || (item['properties']
                        && item['properties'].featureclass
                        && item['properties'].featureclass === featureClass))),
            map(features => {
                return {
                    'type': 'FeatureCollection',
                    'features': features
                } as FeatureCollection
            })
        );
    }

    getSelectedFeatures$(): Observable<GeoJsonFeature> {
        return this.selectedFeature$;
    }

    selectFeature(feature: GeoJsonFeature) {
        this.selectedFeature$.next(feature);
    }

    createFeature(feature: GeoJsonFeature) {
        this.store.dispatch(new fromMap.AddMapFeature({ mapFeature: feature }));
    }

    removeFeature(id: string) {
        this.store.dispatch(new fromMap.DeleteMapFeature({ id }));
    }

    showLayer(layer: string) {
        this.store.dispatch(new fromMap.ShowMapLayer({ layer: layer }));
    }

    hideLayer(layer: string) {
        this.store.dispatch(new fromMap.HideMapLayer({ layer: layer }));
    }

    getVisibleLayers$(): Observable<{ [key: string]: boolean }> {
        return this.store.pipe(select(mapSelectors.selectVisibleLayers));
    }
}
