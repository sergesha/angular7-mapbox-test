import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserModel } from '@app/models/user.model';
import { reduceObject } from '@app/shared/helpers';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    constructor(
        // private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
    }

    get authState$(): Observable<firebase.User> {
        return this.afAuth.authState;
    }

    // Returns current user Observable
    get currentUser$(): Observable<UserModel> {
        return this.authState$.pipe(
            switchMap(authState =>
                of(FirebaseAuthService.pickUserInfo(
                    authState,
                    ['uid', 'displayName', 'email', 'photoURL'])
                )
            )
        );
    }

    private static pickUserInfo(authState: firebase.User, keyList: (keyof UserModel)[]): UserModel | null {
        return reduceObject(authState, keyList);
    }

    ////// OAuth Methods /////
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }

    //// Anonymous Auth ////
    anonymousLogin() {
        return this.afAuth.auth
            .signInAnonymously()
            .catch(error => {
                this.handleError(error);
            });
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .catch(error => this.handleError(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.handleError(error));
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        return firebase.auth()
            .sendPasswordResetEmail(email)
            .catch(error => this.handleError(error));
    }

    signOut(path: string = '/') {
        return this.afAuth.auth.signOut().then(() => {
            this.router.navigate([path]);
        });
    }

    private oAuthLogin(provider: any) {
        return this.afAuth.auth
            .signInWithPopup(provider)
            // .then(credential => {
            //     return this.updateUserData(credential.user);
            // })
            .catch(error => this.handleError(error));
    }

    // Sets user data to firestore after successful login
    // private updateUserData(user: UserModel) {
    //     const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc<UserModel>(
    //         `users/${user.uid}`
    //     );
    //
    //     const data: UserModel = {
    //         uid: user.uid,
    //         email: user.email || null,
    //         displayName: user.displayName || 'nameless user',
    //         photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    //     };
    //
    //     return userRef.set(data, { merge: true });
    // }

    // If error, console log
    private handleError(error: Error) {
        console.error(error);
    }
}
