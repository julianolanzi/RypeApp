import { AccountLoadErrorAction } from './../actions/account/account-load-error.actions';
import { AccountLoadSuccessAction } from './../actions/account/account-load-success.actions';
import { createReducer, Action, on } from '@ngrx/store';
import { AccountLoadRequestAction } from '../actions/account/account-load-request.actions';
import { AccountState } from '../states/account.state';

export const initialState: AccountState = {
  account: {
    id: '',
    idGame: '',
    nickname: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    url: '',
    gender: '',
    country: '',
    birthday: undefined,
    verify: false,
    discord: '',
    instagram: '',
    facebook: '',
    youtube: '',
    team: [
      {
        teamName: '',
        tagName: '',
        ranking: 0,
        admin: '',
        url: '',
        description: '',
        createdAt: undefined,
      },
    ],
    createdAt: undefined,
  },
  authError: undefined,
  loading: false,
  ischange: false,
};

const _accountReducer = createReducer(
  initialState,
  on(new AccountLoadRequestAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    loading: true,
    ischange: false,
  })),
  on(new AccountLoadSuccessAction().createAction(), (state, action) => ({
    ...state,
    account: { ...action.payload },
    authError: undefined,
    loading: false,
    ischange: false,
  })),
  on(new AccountLoadErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    loading: false,
    ischange: false,
  })),
);

export function accountReducer(state: any, action: Action) {
  return _accountReducer(state, action);
}
