import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const getErrorMessage = createSelector(
  getAuthState,
  (state: AuthState) => state.errorMessage
);

export const getUserInStore = createSelector(
  getAuthState,
  (state: AuthState) => state
);

export const GetUserToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);

export const loading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);
