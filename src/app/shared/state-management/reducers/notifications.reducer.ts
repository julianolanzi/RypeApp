import { NotificationsGetUserError } from './../actions/notifications/user-notifications/get-notifications/notifications-load-error.actions';
import { NotificationsGetUserSuccess } from './../actions/notifications/user-notifications/get-notifications/notifications-load-success.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { NotificationsGetUserRequest } from '../actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { NotificationsState } from "../states/notifications.state";
import { TeamNotificationsGetRequest } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-request.actions';
import { TeamNotificationsGetSuccess } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-success.actions';
import { TeamNotificationsGetError } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-error.actions';
import { DeleteNotificationsRequest } from '../actions/notifications/delete-notifications/notifications-delete-load-request.actions';
import { DeleteNotificationsSuccess } from '../actions/notifications/delete-notifications/notifications-delete-load-success.actions';
import { InviteTeamNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { InviteTeamNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-success.actions';
import { InviteTeamNotificationsError } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-error.actions';

export const initialState: NotificationsState = {
  userNotifications: [],
  teamNotifications: [],
  errorNotifications: undefined,
}

const _notificationsReducer = createReducer(
  initialState,

  on(new NotificationsGetUserRequest().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: undefined,
  })),
  on(new NotificationsGetUserSuccess().createAction(), (state, action) => ({
    ...state,
    userNotifications: [ ...action.payload ],
    errorNotifications: undefined,
  })),
  on(new NotificationsGetUserError().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: action.payload,
  })),
  on(new TeamNotificationsGetRequest().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: undefined,
  })),
  on(new TeamNotificationsGetSuccess().createAction(), (state, action) => ({
    ...state,
    teamNotifications: [ ...action.payload ],
    errorNotifications: undefined,
  })),
  on(new TeamNotificationsGetError().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: action.payload,
  })),

  on(new DeleteNotificationsRequest().createAction(), (state) => ({
    ...state,
  })),
  on(new DeleteNotificationsSuccess().createAction(), (state) => ({
    ...state,
  })),
  on(new DeleteNotificationsSuccess().createAction(), (state, action) => ({
    ...state,
    errorNotifications: action.payload,
  })),

  on(new InviteTeamNotificationsRequest().createAction(), (state) => ({
    ...state,
  })),
  on(new InviteTeamNotificationsSuccess().createAction(), (state) => ({
    ...state,
  })),
  on(new InviteTeamNotificationsError().createAction(), (state, action) => ({
    ...state,
    errorNotifications: action.payload,
  })),

)

export function notificationsReducer(state: any, action: Action) {
  return _notificationsReducer(state, action);
}
