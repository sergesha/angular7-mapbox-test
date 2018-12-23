import { Injectable } from '@angular/core';
import { FirebaseAuthService } from '@app/core/auth/services/firebase-auth.service';
import * as fromAuth from '@app/core/auth/store/auth.actions';
import { UserModel } from '@app/models/user.model';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    @Effect()
    init$ = defer((): Observable<Action> => {
        return this.authService.currentUser$.pipe(
            map((currentUser: UserModel) => {
                if (currentUser) {
                    /// User logged in
                    return new fromAuth.LoggedIn({ user: currentUser });
                } else {
                    /// User not logged in
                    return new fromAuth.LoggedOut();
                }
            })
        );
    });

    @Effect({ dispatch: false })
    googleLogin$: Observable<Action> | void = this.actions$.pipe(
        ofType<fromAuth.GoogleLogin>(fromAuth.AuthActionTypes.GoogleLogin),
        tap(() => {
            this.authService.googleLogin();
        }),
        catchError(error => of(new fromAuth.AuthError({ error: error })))
    );

    @Effect({ dispatch: false })
    logout$: Observable<Action> | void = this.actions$.pipe(
        ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout),
        // map((action: fromAuth.Logout) => action.payload),
        tap(() => {
            this.authService.signOut();
        }),
        catchError(error => of(new fromAuth.AuthError({ error: error })))
    );

    constructor(private actions$: Actions, private authService: FirebaseAuthService) {
    }
}
