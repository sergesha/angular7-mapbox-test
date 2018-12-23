import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '@app/core/auth/services/firebase-auth.service';
import { AuthState } from '@app/core/auth/store/auth-state.model';
import * as fromAuth from '@app/core/auth/store/auth.actions';
import { authSelectors } from '@app/core/auth/store/auth.selectors';
import { FirestoreAdapterService } from '@app/core/services';
import { AppState } from '@app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular6-ngrx-mat-bootstrap-seed';
    showFiller = true;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    items: Observable<any[]>;
    itemsWithIds: Observable<any[]>;
    auth;
    auth$: Observable<AuthState>;
    user;

    constructor(private breakpointObserver: BreakpointObserver,
                private authService: FirebaseAuthService,
                private db: FirestoreAdapterService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.auth = this.authService;
        this.items = this.db.col$('users', ref => ref.where('displayName', '==', 'Serge S.'));
        this.items.subscribe(users => console.log('Users', users));
        this.itemsWithIds = this.db.colWithIds$('users');
        this.itemsWithIds.subscribe(users => console.log('WithIds', users));

        this.auth$ = this.store.select('auth');
        this.user = this.store.pipe(select(authSelectors.userInfo));
    }

    login() {
        // this.auth.googleLogin();
        this.store.dispatch(new fromAuth.GoogleLogin());
    }

    logout() {
        // this.auth.signOut();
        this.store.dispatch(new fromAuth.Logout());
    }
}
