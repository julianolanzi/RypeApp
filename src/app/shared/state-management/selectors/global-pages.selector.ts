import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalPageState } from '../states/global-pages.state';


export const LoadingGlobalSelector = createFeatureSelector<GlobalPageState>('globalPages');

const _loadingGlobal = (state: GlobalPageState) => state.isloading;

const _smallLoadingMessage = (state: GlobalPageState) => state.isSmallLoadingMessage;
const _smallLoading = (state: GlobalPageState) => state.isSmallLoading;
const _isNotifications = (state: GlobalPageState) => state.isNotifications;

const _globalImgUser = (state: GlobalPageState) => state.url;
const _IsUrlCoverUser = (state: GlobalPageState) => state.coverUser;


const _globalImgTeam = (state: GlobalPageState) => state.urlTeam;
const _isUrlCoverTeam = (state: GlobalPageState) => state.coverTeam;


export const isLoadingGlobal = createSelector(LoadingGlobalSelector, _loadingGlobal);
export const smallLoading = createSelector(LoadingGlobalSelector, _smallLoading);
export const isNotifications = createSelector(LoadingGlobalSelector, _isNotifications);
export const smallLoadingMessage = createSelector(LoadingGlobalSelector, _smallLoadingMessage);

export const isUrlCoverTeam = createSelector(LoadingGlobalSelector, _isUrlCoverTeam);
export const isUrlCoverUser = createSelector(LoadingGlobalSelector, _IsUrlCoverUser);

export const url = createSelector(LoadingGlobalSelector, _globalImgUser);
export const urlTeam = createSelector(LoadingGlobalSelector, _globalImgTeam);
