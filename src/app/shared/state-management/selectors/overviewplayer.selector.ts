import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OverviewPlayerState } from "../states/overview-player.state";

export const OverviewPlayerGlobalSelector = createFeatureSelector<OverviewPlayerState>('overviewPlayer');

const _PlayerId = (state: OverviewPlayerState) => state.id;
const _PlayerData = (state: OverviewPlayerState) => state.user;
const _playerTimeline = (state: OverviewPlayerState) => state.timeline;

export const PlayerId = createSelector(OverviewPlayerGlobalSelector, _PlayerId);
export const PlayerData = createSelector(OverviewPlayerGlobalSelector, _PlayerData);
export const PlayerTimeline = createSelector(OverviewPlayerGlobalSelector, _playerTimeline);