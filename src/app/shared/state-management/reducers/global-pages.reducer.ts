import { createReducer, on, Action } from '@ngrx/store';


import { GlobalPageState } from '../states/global-pages.state';
import { LoadingActiveAction } from '../actions/global-pages/loading-load-active.actions';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { UpdateImgAccountAction } from '../actions/global-pages/global-load-update-img.actions';
import { LoadingSmallActiveAction } from '../actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadingNotificationsDisabledAction } from '../actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { LoadingNotificationsActiveAction } from '../actions/global-pages/global-notifications/loading-notifications-active.actions';
import { LoadingSmallDisabledAction } from '../actions/global-pages/global-loading-small/loading-small-disabled.actions';

export const initialState: GlobalPageState = {
  isloading: false,
  url: '',
  isSmallLoading: false,
  isNotifications: false,
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
  on(new LoadingSmallActiveAction().createAction(), (state) => ({
    ...state,
    isloading: false,
    isSmallLoading: true,
 
  })),
  on(new LoadingSmallDisabledAction().createAction(), (state) => ({
    ...state,
    isloading: false,
    isSmallLoading: false,
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



  
);

export function globalPagesReducer(state: any, action: Action) {
  return _globalPagesReducer(state, action);
}
