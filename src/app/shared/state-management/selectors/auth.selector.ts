import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';


export const AuthGlobalSelector = createFeatureSelector<AuthState>('auth');

const _auth = (state: AuthState) => state.user;
const _loading = (state: AuthState) => state.loading;
const _authentication = (state: AuthState) => state.isAuthenticated;

export const AuthSelector = createSelector(AuthGlobalSelector, _auth);
export const IsLoading = createSelector(AuthGlobalSelector, _loading);
export const isAuthenticated = createSelector(AuthGlobalSelector, _authentication);