import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OverviewState } from "../states/overview.state";

export const OverviewGlobalSelector = createFeatureSelector<OverviewState>('overview');

const _PlayerId = (state: OverviewState) => state.id;
const _PlayerData = (state: OverviewState) => state.user;
const _playerTimeline = (state: OverviewState) => state.timeline;

export const PlayerId = createSelector(OverviewGlobalSelector, _PlayerId);
export const PlayerData = createSelector(OverviewGlobalSelector, _PlayerData);
export const PlayerTimeline = createSelector(OverviewGlobalSelector, _playerTimeline);