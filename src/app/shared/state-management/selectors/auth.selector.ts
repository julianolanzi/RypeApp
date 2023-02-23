import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';


export const AuthGlobalSelector = createFeatureSelector<AuthState>('auth');

const _auth = (state: AuthState) => state.auth;

export const AuthSelector = createSelector(AuthGlobalSelector, _auth);