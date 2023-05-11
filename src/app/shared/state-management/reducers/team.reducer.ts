import { createReducer, on, Action, createAction } from '@ngrx/store';
import { TeamLoadCreateRequestAction } from '../actions/teams/create-team/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/create-team/team-load-create-success.actions';


import { TeamLoadSuccessAction } from '../actions/teams/team-load/team-load-success.actions';
import { TeamLoadUpdateSuccessAction } from '../actions/teams/update/team-load-success-info.actions';

import { TeamLoadUpdateRequestAction } from '../actions/teams/update/team-load-update-info.actions';

import { TeamState } from './../states/teams.state';
import { TeamLoadAction } from '../actions/teams/team-load/team-load.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/update-team/team-load-info-request.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/update-team/team-load-info-success.actions';
import { TeamLoadUpdateRequestImg } from '../actions/teams/team-img/team-load-update-img-request.actions';
import { TeamLoadUpdateSuccessImg } from '../actions/teams/team-img/team-load-update-img-success.actions';
import { TeamLoadSearchMemberRequestAction } from '../actions/teams/search-members/team-load-search-member-request.actions';
import { TeamLoadSearchMemberSuccessAction } from '../actions/teams/search-members/team-load-search-member-success.actions';
import { TeamRemoveMemberRequestAction } from '../actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamRemoveMemberSuccessAction } from '../actions/teams/team-remove-member/team-load-remove-member-success.actions';
import { TeamLoadGlobalErrorAction } from '../actions/teams/team-load-global-error.actions';

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
    _id: '',
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
  searchMembers: [],
};

const _teamReducer = createReducer(
  initialState,

  on(new TeamLoadCreateSuccessAction().createAction(), (state, action) => ({
    ...state,
    team: { ...action.payload },
    authError: undefined,
    teamSearch: [],
  })),
  on(new TeamLoadGlobalErrorAction().createAction(), (state, action) => ({
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


  on(new TeamLoadInfoRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    isLoadingTeam: false,
  })),
  on(new TeamLoadInfoSuccessAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamInfo: action.payload,
    teamSearch: [],
    isLoadingTeam: true,
  })),

  on(new TeamLoadUpdateRequestAction().createAction(), (state) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
    isLoadingTeam: false,
  })),
  on(new TeamLoadUpdateSuccessAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamInfo: action.payload,
    teamSearch: [],
    isLoadingTeam: false,
  })),

  on(new TeamLoadUpdateRequestImg().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    isLoadingTeam: false,
    teamSearch: [],
  })),
  on(new TeamLoadUpdateSuccessImg().createAction(), (state, action) => {
    const newTeam = {
      ...state.teamInfo,
      url: action.payload.url,
    };
    return {
      ...state,
      teamInfo: newTeam,
      authError: undefined,
      isLoadingTeam: false,
      teamSearch: [],
    };
  }),

  on(new TeamLoadSearchMemberRequestAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
    searchMembers: [],
  })),
  on(new TeamLoadSearchMemberSuccessAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
    searchMembers: [...action.payload],
  })),

  on(new TeamRemoveMemberRequestAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
    teamInfo: {...initialState.teamInfo},
  })),
  on(new TeamRemoveMemberSuccessAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
    teamSearch: [],
  })),

);

export function teamReducer(state: any, action: Action) {
  return _teamReducer(state, action);
}
