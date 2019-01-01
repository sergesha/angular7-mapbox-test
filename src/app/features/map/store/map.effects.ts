import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromAirports from '../../../../assets/airports.json';
import * as fromPorts from '../../../../assets/ports.json';
import * as fromMap from './map.actions';

// Loading geojson data from files
const featuresData = {
    airports: fromAirports['features'],
    ports: fromPorts['features']
};

@Injectable()
export class MapEffects {
    @Effect()
    loadMapFeatures$: Observable<Action> | void = this.actions$.pipe(
        ofType<fromMap.LoadMapFeatures>(fromMap.MapActionTypes.LoadMapFeatures),
        switchMap(() => from(Object.keys(featuresData))),
        switchMap(key => of(new fromMap.AddMapFeatures({ mapFeatures: featuresData[key] }))),
        map(features => {
                features.payload.mapFeatures.map(feature => {
                    const { featureclass, name, website } = feature.properties;
                    feature.properties.description = `<strong>${featureclass}: ${name}</strong><p><a href="//${website}" target="_blank" title="Opens in a new window">Go to Website</a></p>`;
                });
                return features;
            }
        )
        // catchError(error => of(new fromMap.MapError({ error: error })))
    );

    @Effect()
    init$ = defer((): Observable<Action> => {
        // Load data on init
        return of(new fromMap.LoadMapFeatures());
        // return this.authService.currentUser$.pipe(
        //     map((currentUser: UserModel) => {
        //         if (currentUser) {
        //             /// User logged in
        //             return new fromAuth.LoggedIn({ user: currentUser });
        //         } else {
        //             /// User not logged in
        //             return new fromAuth.LoggedOut();
        //         }
        //     })
        // );
    });

    constructor(private actions$: Actions) {
    }
}
