import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from '../states/teams.state';

export const TeamGlobalSelector = createFeatureSelector<TeamState>('team');

const _team = (state: TeamState) => state.team;
const _searctTeams = (state: TeamState) => state.teamSearch;
const _teamInfo = (state: TeamState) => state.teamInfo;
const _loadingTeam = (state: TeamState) => state.isLoadingTeam;
const _searchMembers = (state: TeamState) => state.searchMembers;

export const TeamInfoSelector = createSelector(TeamGlobalSelector, _team);
export const TeamSearchSelector = createSelector(
  TeamGlobalSelector,
  _searctTeams
);
export const TeamDataSelector = createSelector(TeamGlobalSelector, _teamInfo);
export const TeamLoadingTeam = createSelector(TeamGlobalSelector, _loadingTeam);
export const SearchMembers = createSelector(TeamGlobalSelector, _searchMembers);
