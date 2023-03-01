import { createReducer, on, Action } from '@ngrx/store';
import { TeamLoadCreateErrorAction } from '../actions/teams/team-load-create-error.actions';
import { TeamLoadCreateRequestAction } from '../actions/teams/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/team-load-create-success.actions';
import { TeamLoadErrorAction } from '../actions/teams/team-load-error.actions';
import { TeamLoadInfoErrorAction } from '../actions/teams/team-load-info-error.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/team-load-info-request.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/team-load-info-success.actions';
import { TeamLoadSuccessAction } from '../actions/teams/team-load-success.actions';
import { TeamLoadAction } from '../actions/teams/team-load.actions';

import { TeamState } from './../states/teams.state';

export const initialState: TeamState = {
  team: {
    idTeam: '',
    id: '',
    name: '',
    tagName: '',
    ranking: '',
    admin: '',
    description: '',
    emailTeam: '',
    discordTeam: '',
    facebookTeam: '',
    youtubeTeam: '',
    instagramTeam: '',
    url: '',
    members: [],
    adminMembers: [],
    lines: [],
    private: false,

    createdAt: undefined,
  },
  teamInfo: {
    idTeam: '',
    name: '',
    tagName: '',
    ranking: '',
    admin: {
      url: '',
      nickname: '',
      country: '',
    },
    description: '',
    emailTeam: '',
    discordTeam: '',
    facebookTeam: '',
    youtubeTeam: '',
    instagramTeam: '',
    url: '',
    members: [],
    adminMembers: [],
    lines: [],
    private: false,

    createdAt: undefined,
  },
  authError: undefined,
  teamSearch: [],
  isLoadingTeam: false,
};

const _teamReducer = createReducer(
  initialState,

  on(new TeamLoadCreateSuccessAction().createAction(), (state, action) => ({
    ...state,
    team: { ...action.payload },
    authError: undefined,
    teamSearch: [],
  })),
  on(new TeamLoadCreateErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    teamSearch: [],
  })),
  on(new TeamLoadCreateRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
  })),

  on(new TeamLoadAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
  })),
  on(new TeamLoadSuccessAction().createAction(), (state, action) => ({
    ...state,
    teamSearch: [...action.payload],
    authError: undefined,
  })),
  on(new TeamLoadErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    teamSearch: [],
  })),

  on(new TeamLoadInfoRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
    isLoadingTeam: false,
  })),
  on(new TeamLoadInfoSuccessAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamInfo: action.payload,
    teamSearch: [],
    isLoadingTeam: true,
  })),
  on(new TeamLoadInfoErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    teamSearch: [],
    isLoadingTeam: false,
  }))
);

export function teamReducer(state: any, action: Action) {
  return _teamReducer(state, action);
}
