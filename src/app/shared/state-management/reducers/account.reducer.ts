import { createReducer, Action, on } from '@ngrx/store';

import { AccountUpdateLoadImgErrorAction } from './../actions/account/account-update-load-img-error.actions';
import { AccountUpdateLoadRequestAction } from './../actions/account/account-update-load.actions';
import { AccountLoadErrorAction } from './../actions/account/account-load-error.actions';
import { AccountLoadSuccessAction } from './../actions/account/account-load-success.actions';
import { AccountLoadRequestAction } from '../actions/account/account-load-request.actions';
import { AccountState } from '../states/account.state';
import { AccountUpdateLoadErrorAction } from '../actions/account/account-update-load-error.actions';
import { AccountUpdateLoadSuccessAction } from '../actions/account/account-update-load-success.actions';
import { AccountUpdateLoadImgRequestAction } from '../actions/account/account-update-load-img-request.actions';
import { AccountUpdateLoadImgSuccessAction } from '../actions/account/account-update-load-img-success.actions';
import { AccountUpdatePassLoadRequestAction } from '../actions/account/account-update-pass-request-actions';
import { AccountUpdatePassLoadSuccessAction } from '../actions/account/account-update-pass-success-actions';
import { AccountUpdatePassLoadErrorAction } from '../actions/account/account-update-pass-error-actions';

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

  on(new AccountUpdateLoadRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    loading: true,
    ischange: true,
  })),
  on(new AccountUpdateLoadSuccessAction().createAction(), (state, action) => ({
    ...state,
    account: { ...action.payload },
    authError: undefined,
    loading: false,
    ischange: true,
  })),
  on(new AccountUpdateLoadErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    loading: false,
    ischange: false,
  })),

  on(new AccountUpdateLoadImgRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    loading: true,
    ischange: true,
  })),
  on(
    new AccountUpdateLoadImgSuccessAction().createAction(),
    (state, action) => {
      const newUser = {
        ...state.account,
        url: action.payload.url,
      };
      return {
        ...state,
        account: newUser,
        loading: false,
        ischange: true,
      };
    }
  ),
  on(new AccountUpdateLoadImgErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    loading: false,
    ischange: false,
  })),

  on(new AccountUpdatePassLoadRequestAction().createAction(), (state) => {
    return {...state, loading: true};
  }),

  on(
    new AccountUpdatePassLoadSuccessAction().createAction(),
    (state) => {
      return {...state, loading: false};
    }
  ),

  on(
    new AccountUpdatePassLoadErrorAction().createAction(),
    (state, action) => ({
      ...state,
      authError: action.payload,
      loading: false,
      ischange: false,
    })
  )
);

export function accountReducer(state: any, action: Action) {
  return _accountReducer(state, action);
}
