import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalPageState } from '../states/global-pages.state';


export const LoadingGlobalSelector = createFeatureSelector<GlobalPageState>('globalPages');

const _loadingGlobal = (state: GlobalPageState) => state.isloading;

const _globalImg  = (state: GlobalPageState) => state.url;

export const isLoadingGlobal = createSelector(LoadingGlobalSelector, _loadingGlobal);
export const url = createSelector(LoadingGlobalSelector, _globalImg);
