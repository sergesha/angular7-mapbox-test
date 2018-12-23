import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserModel } from '@app/models/user.model';
import { AngularFireAuthStub, credentialsMock, fakeAuthState, userMock } from '@app/test-stubs/angular-fire-auth.stub';
import { Subscription } from 'rxjs';

import { FirebaseAuthService } from './firebase-auth.service';


@Component({ template: '' })
class TestComponent {
}

const testRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TestComponent
            },
            {
                path: 'logout',
                component: TestComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

describe('FirebaseAuthService', () => {
    let service: FirebaseAuthService;
    let currentUser: UserModel;
    let afAuth: AngularFireAuth;
    let isAuth: boolean;
    let subscriptions$: Subscription[];
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(testRoutes)
            ],
            providers: [
                { provide: AngularFireAuth, useValue: AngularFireAuthStub },
            ]
        });
        router = TestBed.get(Router);
        service = TestBed.get(FirebaseAuthService);
        afAuth = TestBed.get(AngularFireAuth);

        subscriptions$ = [
            service.authState$
            .subscribe(authState => {
                isAuth = !!authState;
            }),
            service.currentUser$
                .subscribe(user => {
                    currentUser = user;
                })
        ];
    });

    afterEach(() => {
        fakeAuthState.next(null);
        [...subscriptions$].forEach(s => s.unsubscribe());
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be authenticated after register', () => {
        service.emailSignUp(credentialsMock.email, credentialsMock.password);

        expect(afAuth.auth.createUserWithEmailAndPassword)
            .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
        expect(isAuth).toBe(true);
        // expect(service.user.email).toEqual(credentialsMock.email);
    });

    it('should be authenticated after logging in by email', () => {
        service.emailLogin(credentialsMock.email, credentialsMock.password);

        expect(afAuth.auth.signInWithEmailAndPassword)
            .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
        expect(isAuth).toBeTruthy();
        // expect(service.user.email).toEqual(credentialsMock.email);
    });

    // TODO: googleLogin Test
    // it('should be authenticated after logging in by google', () => {
    //     service.googleLogin();
    //
    //     expect(afAuth.auth.signInWithPopup)
    //         .toHaveBeenCalled();
    //     expect(isAuth).toBeTruthy();
    //     // expect(service.user.email).toEqual(credentialsMock.email);
    // });

    it('should not be authenticated after logging out', () => {
        fakeAuthState.next(userMock);
        expect(isAuth).toBe(true);
        // expect(service.user.email).toEqual(credentialsMock.email);

        service.signOut('/logout').then(() => {
            expect(isAuth).toBe(false);
            expect(router.url).toEqual('/logout');
        });

        // expect(service.user).toBe(null);
    });
});
