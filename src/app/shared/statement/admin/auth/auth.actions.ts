import { createAction, props } from '@ngrx/store';
import { UserLogin } from 'src/app/models/auth/user-login';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { AuthCredentials, AuthFailure, AuthSuccess } from './auth.models';

export const enum authTypeAction {
  AUTH_LOAD_REQUEST = '[AUTH] LOGIN',
  AUTH_LOAD_SUCESS = '[AUTH SUCESS] CARREGADO COM SUCESSO',
  AUTH_LOAD_FAIL = '[AUTH FAIL] CARREGADO COM FALHA',

  AUTH_LOAD_PERMISSION = '[AUTH PERMISSION] PERMISSÃO CARREGADA COM SUCESSO',
}

export const login = createAction(
  authTypeAction.AUTH_LOAD_REQUEST,
  props<{ credentials: AuthCredentials }>()
);

export const loginSuccess = createAction(
  authTypeAction.AUTH_LOAD_SUCESS,
  props<AuthSuccess>()
);

export const loginFailure = createAction(
  authTypeAction.AUTH_LOAD_FAIL,
  props<{error: string}>()
);





// export const AuthLoadRequest = createAction(
//   authTypeAction.AUTH_LOAD_REQUEST,
//   props<{ payload: UserLogin }>
// );

// export const AuthLoadSuccess = createAction(
//   authTypeAction.AUTH_LOAD_SUCESS,
//   props<UserLogin>()
// );

// export const AuthLoadFail = createAction(
//   authTypeAction.AUTH_LOAD_SUCESS,
//   props<{ error: string }>()
// );
