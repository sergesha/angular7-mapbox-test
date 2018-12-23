import { Component, OnInit } from '@angular/core';
import { CITY_COORDINATES } from '@app/features/map/city-coordinates';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { AppState } from '@app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromMap from './store/map.actions';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    markers = [
        new GeoJsonFeature(CITY_COORDINATES.praha, { id: 'praha', message: 'Ahoj, Praha!' }),
        new GeoJsonFeature(CITY_COORDINATES.kaliningrad, { id: 'kaliningrad', message: 'Привет, Калининград!' }),
    ];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        // Load features from remote if any
        this.store.dispatch(new fromMap.LoadMapFeatures());
        // Load test set of features
        this.store.dispatch(new fromMap.UpsertMapFeatures({ mapFeatures: this.markers }));
    }

}
