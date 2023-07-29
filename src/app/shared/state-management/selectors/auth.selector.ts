import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const AuthGlobalSelector = createFeatureSelector<AuthState>('auth');

const _auth = (state: AuthState) => state.user;
const _adminTeam = (state: AuthState) => state.user.rolesTeam;
const _admin = (state: AuthState) => state.user.role;
const _authentication = (state: AuthState) => state.isAuthenticated;
const _idUser = (state: AuthState) => state.user.id;

export const AuthSelector = createSelector(AuthGlobalSelector, _auth);
export const isAuthenticated = createSelector(
  AuthGlobalSelector,
  _authentication
);
export const isAdminTeam = createSelector(AuthGlobalSelector, _adminTeam);
export const isAdmin = createSelector(AuthGlobalSelector, _admin);
export const idUser = createSelector(AuthGlobalSelector, _idUser);
