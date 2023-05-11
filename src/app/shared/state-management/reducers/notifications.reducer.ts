import { NotificationsGetUserSuccess } from './../actions/notifications/user-notifications/get-notifications/notifications-load-success.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { NotificationsGetUserRequest } from '../actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { NotificationsState } from "../states/notifications.state";
import { TeamNotificationsGetRequest } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-request.actions';
import { TeamNotificationsGetSuccess } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-success.actions';
import { DeleteNotificationsRequest } from '../actions/notifications/delete-notifications/notifications-delete-load-request.actions';
import { DeleteNotificationsSuccess } from '../actions/notifications/delete-notifications/notifications-delete-load-success.actions';
import { InviteTeamNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { InviteTeamNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-success.actions';
import { InviteUserNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-user/notifications-user-invite-request.actions';
import { InviteUserNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-user/notifications-user-invite-success.actions';
import { QuestionTeamNotificationsRequest } from '../actions/notifications/team-notifications/update-notifications/notifications-team-question-request.actions';
import { QuestionTeamNotificationsSuccess } from '../actions/notifications/team-notifications/update-notifications/notifications-team-question-success.actions';
import { NotificationGlobalError } from '../actions/notifications/notifications-global-erros.actions';

export const initialState: NotificationsState = {
  userNotifications: [],
  teamNotifications: [],
  errorNotifications: undefined,
}

const _notificationsReducer = createReducer(
  initialState,

  on(new NotificationGlobalError().createAction(), (state, action) => ({
    ...state,
    userNotifications: [],
    teamNotifications: [],
    errorNotifications: action.payload,
  })),

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
  on(new InviteUserNotificationsRequest().createAction(), (state) => ({
    ...state,
  })),
  on(new InviteUserNotificationsSuccess().createAction(), (state) => ({
    ...state,
  })),

  on(new QuestionTeamNotificationsRequest().createAction(), (state) => ({
    ...state,
  })),
  on(new QuestionTeamNotificationsSuccess().createAction(), (state) => ({
    ...state,
  })),




)

export function notificationsReducer(state: any, action: Action) {
  return _notificationsReducer(state, action);
}
