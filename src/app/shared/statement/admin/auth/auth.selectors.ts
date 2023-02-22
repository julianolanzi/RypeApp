import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(
  getAuthState,
  (state) => state.isAuthenticated
);

export const getErrorMessage = createSelector(
  getAuthState,
  (state) => state.errorMessage
);

export const getUserInStore = createSelector(
  getAuthState,
  (state) => state.user
);

export const getAccessToken = createSelector(
    getAuthState,
    (state) => state.token
  );

  export const loading = createSelector(getAuthState, (state) => state.loading);

