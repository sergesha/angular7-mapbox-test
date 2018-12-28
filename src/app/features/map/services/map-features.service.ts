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

    getFeatures$(): Observable<GeoJsonFeature[]> {
        return this.store.pipe(select(mapSelectors.selectMapFeatures));
    }

    getFeatureCollection$(): Observable<FeatureCollection> {
        return this.store.pipe(
            select(mapSelectors.selectMapFeatures),
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
}
