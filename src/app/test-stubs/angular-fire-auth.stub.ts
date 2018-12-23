import { BehaviorSubject } from 'rxjs';

export const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
};

export const userMock = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
    isAnonymous: false,
    email: credentialsMock.email,
    displayName: 'Mock User',
    photoURL: 'photoURL path'
} as firebase.User;

export const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this guy

const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
};

export const AngularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
        createUserWithEmailAndPassword: jasmine
            .createSpy('createUserWithEmailAndPassword')
            .and
            .callFake(fakeSignInHandler),
        signInWithEmailAndPassword: jasmine
            .createSpy('signInWithEmailAndPassword')
            .and
            .callFake(fakeSignInHandler),
        googleLogin: jasmine
            .createSpy('signInWithPopup')
            .and
            .callFake(fakeSignInHandler),
        signOut: jasmine
            .createSpy('signOut')
            .and
            .callFake(fakeSignOutHandler),
    },
};
