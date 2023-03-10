import { createReducer, on, Action, createAction } from '@ngrx/store';
import { TeamLoadCreateErrorAction } from '../actions/teams/create-team/team-load-create-error.actions';
import { TeamLoadCreateRequestAction } from '../actions/teams/create-team/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/create-team/team-load-create-success.actions';

import { TeamLoadErrorAction } from '../actions/teams/team-load/team-load-error.actions';
import { TeamLoadInfoErrorAction } from '../actions/teams/update-team/team-load-info-error.actions';

import { TeamLoadSuccessAction } from '../actions/teams/team-load/team-load-success.actions';
import { TeamLoadUpdateErrorAction } from '../actions/teams/update/team-load-error-info.actions';
import { TeamLoadUpdateSuccessAction } from '../actions/teams/update/team-load-success-info.actions';
import { TeamLoadUpdateErrorImg } from '../actions/teams/team-img/team-load-update-img-error.actions';

import { TeamLoadUpdateRequestAction } from '../actions/teams/update/team-load-update-info.actions';

import { TeamState } from './../states/teams.state';
import { TeamLoadAction } from '../actions/teams/team-load/team-load.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/update-team/team-load-info-request.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/update-team/team-load-info-success.actions';
import { TeamLoadUpdateRequestImg } from '../actions/teams/team-img/team-load-update-img-request.actions';
import { TeamLoadUpdateSuccessImg } from '../actions/teams/team-img/team-load-update-img-success.actions';
import { TeamLoadSearchMemberRequestAction } from '../actions/teams/search-members/team-load-search-member-request.actions';
import { TeamLoadSearchMemberSuccessAction } from '../actions/teams/search-members/team-load-search-member-success.actions';
import { TeamLoadSearchMemberErrorAction } from '../actions/teams/search-members/team-load-search-member-error.actions';
import { TeamRemoveMemberRequestAction } from '../actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamRemoveMemberSuccessAction } from '../actions/teams/team-remove-member/team-load-remove-member-success.actions';
import { TeamRemoveMemberErrorAction } from '../actions/teams/team-remove-member/team-load-remove-member-error.actions';

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
  on(new TeamLoadUpdateErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
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
  on(new TeamLoadUpdateErrorImg().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    isLoadingTeam: false,
    teamSearch: [],
  })),
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
  on(new TeamLoadSearchMemberErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    isLoadingTeam: false,
    teamSearch: [],
    searchMembers: [],
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
  on(new TeamRemoveMemberErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
    teamSearch: [],
  }))
);

export function teamReducer(state: any, action: Action) {
  return _teamReducer(state, action);
}
