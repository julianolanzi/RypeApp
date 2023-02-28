import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from '../states/teams.state';

export const TeamGlobalSelector = createFeatureSelector<TeamState>('team');

const _team = (state: TeamState) => state.team;

export const TeamInfoSelector = createSelector(TeamGlobalSelector, _team);
