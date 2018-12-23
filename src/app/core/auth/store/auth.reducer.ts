import { AuthState } from './auth-state.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
    loggedIn: false,
    user: {
        uid: null,
        displayName: null,
        email: null,
        photoURL: null
    },
    loading: false,
    error: ''
};

export function reducer(
    state = initialState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoggedIn: {
            return {
                ...state,
                loggedIn: !!action.payload.user && !!action.payload.user.uid,
                user: action.payload.user || null,
                loading: false
            };
        }

        case AuthActionTypes.LoggedOut: {
            return {
                ...state,
                ...initialState
            };
        }

        case AuthActionTypes.GoogleLogin: {
            return {
                ...state,
                loading: true
            };
        }

        case AuthActionTypes.Logout: {
            return {
                ...state,
                loading: true
            };
        }

        case AuthActionTypes.AuthError: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}

