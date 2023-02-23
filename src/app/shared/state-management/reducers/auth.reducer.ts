import { createReducer, on, Action } from '@ngrx/store';
import { LoadAuthErrorAction } from '../actions/auth/auth-load-error.actions';
import { LoadAuthSuccessAction } from '../actions/auth/auth-load-success.actions';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  auth: {
    email: '',
    password: '',
    token: '',
    id: '',
    nickname: '',
    url: '',
    team: [],
  },
  authError: undefined,
};

const _authReducer = createReducer(
  initialState,
  on(new LoadAuthSuccessAction().createAction(), (state, action) => ({
    ...state,
    auth: { ...action.payload },
  })),
  on(new LoadAuthErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
  }))
);

export function authReducer(state: any, action: Action) {
    return _authReducer(state, action);
}
