import { createReducer, Action, on } from '@ngrx/store';

import { AccountState } from '../states/account.state';
import { AccountUpdateLoadSuccessAction } from '../actions/account/account-update/account-update-load-success.actions';
import { AccountUpdateLoadImgRequestAction } from '../actions/account/account-img/account-update-load-img-request.actions';
import { AccountUpdatePassLoadRequestAction } from '../actions/account/account-reset-password/account-update-pass-request-actions';

import { AccountLoadRequestAction } from '../actions/account/account-overview/account-load-request.actions';
import { AccountLoadSuccessAction } from '../actions/account/account-overview/account-load-success.actions';
import { AccountLoadGlobalErrorAction } from '../actions/account/account-global-error.actions';
import { AccountUpdateLoadRequestAction } from '../actions/account/account-update/account-update-load.actions';
import { AccountUpdateLoadImgSuccessAction } from '../actions/account/account-img/account-update-load-img-success.actions';
import { AccountUpdatePassLoadSuccessAction } from '../actions/account/account-reset-password/account-update-pass-success-actions';

export const initialState: AccountState = {
  account: {
    id: '',
    urlCover: '',
    idRype: '',
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
    social:
    {
      discord: '',
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',
      twitch: '',
      psn: '',
      xbox: '',
      idGame: '',
    },
    address: {
      city: '',
      district: '',
      number: '',
      street1: '',
      street2: '',
      zipcode: '',
    },
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
    notifications:[],
    posts:[],
    createdAt: undefined,
  },
 
  authError: undefined,
  ischange: false,
};

const _accountReducer = createReducer(
  initialState,

  on(new AccountLoadGlobalErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    loading: false,
    ischange: false,
  })),

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

  on(new AccountUpdatePassLoadRequestAction().createAction(), (state) => {
    return { ...state, loading: true };
  }),

  on(new AccountUpdatePassLoadSuccessAction().createAction(), (state) => {
    return { ...state, loading: false };
  })
);

export function accountReducer(state: any, action: Action) {
  return _accountReducer(state, action);
}
