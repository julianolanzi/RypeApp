import { createReducer, on, Action } from '@ngrx/store';


import { GlobalPageState } from '../states/global-pages.state';
import { LoadingActiveAction } from '../actions/global-pages/loading-load-active.actions';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { UpdateImgAccountAction } from '../actions/global-pages/global-update-imgs/global-load-update-img.actions';
import { LoadingSmallActiveAction } from '../actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadingNotificationsDisabledAction } from '../actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { LoadingNotificationsActiveAction } from '../actions/global-pages/global-notifications/loading-notifications-active.actions';
import { LoadingSmallDisabledAction } from '../actions/global-pages/global-loading-small/loading-small-disabled.actions';
import { LoadingSmallMessageAction } from '../actions/global-pages/global-loading-small/loading-small-message.actions';
import { AccountUpdateLoadImgSuccessAction } from '../actions/account/account-img/account-update-load-img-success.actions';
import { UploadImageCoverRequestAction } from '../actions/global-pages/upload-images-cover/loading-upload-cover-request.actions';
import { UploadImageSuccessAction } from '../actions/global-pages/upload-images-cover/loading-upload-cover-success.actions';
import { GlobalErrorAction } from '../actions/global-pages/global-load-error.action';
import { UpdateImgTeamAction } from '../actions/global-pages/global-update-imgs/global-load-update-img-team.actions';

export const initialState: GlobalPageState = {
  isloading: false,
  isSmallLoadingMessage: '',
  url: '',
  urlTeam: '',
  isSmallLoading: false,
  isNotifications: false,
  coverUser: '',
  coverTeam: '',
  GlobalError: undefined,
};

const _globalPagesReducer = createReducer(
  initialState,

  on(new LoadingActiveAction().createAction(), (state) => ({
    ...state,
    isloading: true,
  })),
  on(new LoadingDisabledAction().createAction(), (state) => ({
    ...state,
    isloading: false,
  })),
  on(new UpdateImgAccountAction().createAction(), (state, action) => ({
    ...state,
    isloading: true,
    url: action.payload.url,
  })),
  on(new UpdateImgTeamAction().createAction(), (state, action) => {
    console.log(action.payload);
    return {
      ...state,
      urlTeam: action.payload.url,
    }
  }),
  on(new LoadingSmallActiveAction().createAction(), (state, action) => {

    return {
      ...state,
      isSmallLoading: action.payload?.flag,
      isSmallLoadingMessage: action.payload?.message,
    };
  }),
  on(new LoadingSmallDisabledAction().createAction(), (state) => ({
    ...state,
    isloading: false,
    isSmallLoading: false,
    isSmallLoadingMessage: '',
  })),
  on(new LoadingNotificationsActiveAction().createAction(), (state) => ({
    ...state,

    isSmallLoading: false,
    isNotifications: true,
  })),
  on(new LoadingNotificationsDisabledAction().createAction(), (state) => ({
    ...state,
    isSmallLoading: false,
    isNotifications: false,
  })),
  on(new LoadingSmallMessageAction().createAction(), (state, action) => ({
    ...state,
    isSmallLoadingMessage: action.payload,
  })),
  on(new AccountUpdateLoadImgSuccessAction().createAction(), (state, action) => {

    return {
      ...state,
      url: action.payload.url,
      isloading: false,
    }
  }),
  on(new UploadImageCoverRequestAction().createAction(), (state) => {

    return {
      ...state,
    }
  }),
  on(new UploadImageSuccessAction().createAction(), (state, action) => {

    let urlUser = state.coverUser;
    let urlTeam = state.coverTeam;
    console.log(action.payload.type);
    if (action.payload.type === 'user') {
      urlUser = action.payload.url;
    } else {
      urlTeam = action.payload.url;
    }

    return {
      ...state,
      coverUser: urlUser,
      coverTeam: urlTeam,
    }
  }),
  
  on(new GlobalErrorAction().createAction(), (state, action) => ({
    ...state,
    GlobalError: action.payload,
})),




);

export function globalPagesReducer(state: any, action: Action) {
  return _globalPagesReducer(state, action);
}
