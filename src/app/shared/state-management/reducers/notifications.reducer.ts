import { NotificationsGetUserError } from './../actions/notifications/user-notifications/get-notifications/notifications-load-error.actions';
import { NotificationsGetUserSuccess } from './../actions/notifications/user-notifications/get-notifications/notifications-load-success.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { NotificationsGetUserRequest } from '../actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { NotificationsState } from "../states/notifications.state";
import { TeamNotificationsGetRequest } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-request.actions';
import { TeamNotificationsGetSuccess } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-success.actions';
import { TeamNotificationsGetError } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-error.actions';

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
    teamNotifications: [],
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
    userNotifications: [],
    teamNotifications: [ ...action.payload ],
    errorNotifications: undefined,
  })),
  on(new TeamNotificationsGetError().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: action.payload,
  })),

)

export function notificationsReducer(state: any, action: Action) {
  return _notificationsReducer(state, action);
}
