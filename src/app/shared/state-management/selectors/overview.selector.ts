import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OverviewState } from "../states/overview.state";

export const OverviewGlobalSelector = createFeatureSelector<OverviewState>('overview');

const _PlayerId = (state: OverviewState) => state.id;
const _TeamId = (state: OverviewState) => state.idTeam;
const _PlayerData = (state: OverviewState) => state.user;
const _playerTimeline = (state: OverviewState) => state.timeline;
const _teamInfo = (state: OverviewState) => state.team;

export const PlayerId = createSelector(OverviewGlobalSelector, _PlayerId);
export const PlayerData = createSelector(OverviewGlobalSelector, _PlayerData);
export const PlayerTimeline = createSelector(OverviewGlobalSelector, _playerTimeline);
export const TeamId = createSelector(OverviewGlobalSelector, _TeamId);
export const TeamInfo = createSelector(OverviewGlobalSelector, _teamInfo);