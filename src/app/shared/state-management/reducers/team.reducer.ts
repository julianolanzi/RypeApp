import { createReducer, on, Action } from '@ngrx/store';
import { TeamLoadCreateErrorAction } from '../actions/teams/team-load-create-error.actions';
import { TeamLoadCreateRequestAction } from '../actions/teams/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/team-load-create-success.actions';
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
  authError: undefined,
};

const _teamReducer = createReducer(
  initialState,

  on(new TeamLoadCreateSuccessAction().createAction(), (state, action) => ({
    ...state,
    team: { ...action.payload },
    authError: undefined,
  })),
  on(new TeamLoadCreateErrorAction().createAction(), (state, action) => ({
    ...state,
    authError: action.payload,
  })),
  on(new TeamLoadCreateRequestAction().createAction(), (state, action) => ({
    ...state,
    authError: undefined,
  })),
);

export function teamReducer(state: any, action: Action) {
  return _teamReducer(state, action);
}
