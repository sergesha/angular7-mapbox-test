import { UserModel } from '@app/models/user.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LoggedIn = '[Auth] User Logged In',
    LoggedOut = '[Auth] User Logged Out',
    GoogleLogin = '[Auth] Google Login',
    Logout = '[Auth] Logout',
    AuthError = '[Auth] Error'
}

export class LoggedIn implements Action {
    readonly type = AuthActionTypes.LoggedIn;

    constructor(public payload: { user: UserModel }) {
    }
}

export class LoggedOut implements Action {
    readonly type = AuthActionTypes.LoggedOut;

    constructor(public payload?: any) {
    }
}

export class AuthError implements Action {
    readonly type = AuthActionTypes.AuthError;

    constructor(public payload: { error: string }) {
    }
}

export class GoogleLogin implements Action {
    readonly type = AuthActionTypes.GoogleLogin;

    constructor(public payload?: any) {
    }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;

    constructor(public payload?: any) {
    }
}

export type AuthActions =
    LoggedIn
    | LoggedOut
    | GoogleLogin
    | Logout
    | AuthError;
