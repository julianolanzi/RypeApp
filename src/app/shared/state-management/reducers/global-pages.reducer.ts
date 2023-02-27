import { createReducer, on, Action } from '@ngrx/store';


import { GlobalPageState } from '../states/global-pages.state';
import { LoadingActiveAction } from '../actions/global-pages/loading-load-active.actions';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { UpdateImgAccountAction } from '../actions/global-pages/global-load-update-img.actions';

export const initialState: GlobalPageState = {
  isloading: false,
  url: '',
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

  
);

export function globalPagesReducer(state: any, action: Action) {
  return _globalPagesReducer(state, action);
}
