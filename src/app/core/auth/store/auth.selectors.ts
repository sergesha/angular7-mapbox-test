import { AuthState } from '@app/core/auth/store/auth-state.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
// export const isAuthenticated = createSelector(selectAuthState, (state: AuthState) => !!state.user.uid);
// export const userInfo = createSelector(selectAuthState, (state: AuthState) => state.user);
// export const authError = createSelector(selectAuthState, (state: AuthState) => state.error);

export const authSelectors = {
    isAuthenticated: createSelector(selectAuthState, (state: AuthState) => !!state.user.uid),
    userInfo: createSelector(selectAuthState, (state: AuthState) => state.user),
    authError: createSelector(selectAuthState, (state: AuthState) => state.error)
};
