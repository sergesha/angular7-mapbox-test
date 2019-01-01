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
        new GeoJsonFeature([CITY_COORDINATES.praha.lng, CITY_COORDINATES.praha.lat], {
            id: 'praha',
            message: 'Ahoj, Praha!',
            description: 'Ahoj, Praha!',
            icon: 'star',
            featureclass: 'POI'
        }),
        new GeoJsonFeature([CITY_COORDINATES.kaliningrad.lng, CITY_COORDINATES.kaliningrad.lat], {
            id: 'kaliningrad',
            message: 'Привет, Калининград!',
            description: 'Привет, Калининград!',
            icon: 'star',
            featureclass: 'POI'
        }),
        new GeoJsonFeature([14.48897221919043, 50.095505590365036], {
            message: 'Good Bar',
            description: '<strong>Good bar</strong><p><a href="http://www.restauracekobyla.cz/" target="_blank" title="Opens in a new window">Restaurace Kobyla</a></p>',
            icon: 'bar',
            featureclass: 'POI'
        }),

    ];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        // Load features from remote if any
        // this.store.dispatch(new fromMap.LoadMapFeatures());
        // Now loaded via store effects.
        //
        // Load test set of features
        this.store.dispatch(new fromMap.UpsertMapFeatures({ mapFeatures: this.markers }));
    }
}
