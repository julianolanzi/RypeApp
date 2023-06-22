import { LoadAuthRequestAction } from './../actions/auth/auth-load-request.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { LoadAuthErrorAction } from '../actions/auth/auth-load-error.actions';
import { LoadAuthSuccessAction } from '../actions/auth/auth-load-success.actions';
import { AuthState } from '../states/auth.state';
import { TeamLoadCreateSuccessAction } from '../actions/teams/create-team/team-load-create-success.actions';

export const initialState: AuthState = {
  user: {
    email: '',
    password: '',
    token: '',
    id: '',
    nickname: '',
    url: '',
    role: '',
    idTeam: '',
    rolesTeam: '',
  },
  authError: undefined,
  isAuthenticated: false,
};

const _authReducer = createReducer(
  initialState,

  on(new LoadAuthSuccessAction().createAction(), (state, action) => ({
    ...state,
    user: { ...action.payload },
    loading: false,
    isAuthenticated: true,
  })),
  on(new LoadAuthErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    loading: false,
    isAuthenticated: false,
  })),
  on(new LoadAuthRequestAction().createAction(), (state, action) => ({
    ...state,
    loading: true,
    isAuthenticated: false,
    isLoadingTeam: false,
  })),
  on(new TeamLoadCreateSuccessAction().createAction(), (state, action) => ( {
    user: {
      ...state.user,
      idTeam: action.payload._id,
      rolesTeam: "admin",
    },
    loading: false,
    isAuthenticated: true,
  }) ),




);

export function authReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
