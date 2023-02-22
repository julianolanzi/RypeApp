import { login, loginFailure, loginSuccess } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';

import { User } from './auth.models';

// export interface AuthState {
//   auth: UserLogin | null;
//   authResponse: UserLoginSuccess | null;
//   error: string | '';
// }
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  errorMessage: string | undefined;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  isAuthenticated: false,
  errorMessage: '',
};
// export const initialState: AuthState = {
//   auth: null,
//   authResponse: null,
//   error: '',
// };

const _authReducer = createReducer(
  initialState,
  on(login, () => ({ ...initialState, loading: true })),
  on(loginSuccess, (state, { user, token }) => ({
    token,
    user: user,
    errorMessage: '',
    isAuthenticated: true,
    loading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...initialState,
    errorMessage: error,
  }))
);

// const authReducer = createReducer(
//   initialState,
// on(authActions.AuthLoadSuccess, (state, payload) => ({
//   ...state,
//   auth: payload,
//   error: '',
// })),

//   on(authActions.AuthLoadFail, (state, { error }) => ({
//     ...state,
//     error: error,
//   }))
// );



export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}

export const AUTH_FEATURE_KEY = 'auth';
