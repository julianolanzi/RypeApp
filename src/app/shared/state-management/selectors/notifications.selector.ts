import { NotificationsState } from './../states/notifications.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const NotificationsGlobalSelector = createFeatureSelector<NotificationsState>('notifications');

const _userNotifications = (state: NotificationsState) => state.userNotifications;
const _teamNotifications = (state: NotificationsState) => state.teamNotifications;

export const UserNotifications = createSelector(NotificationsGlobalSelector, _userNotifications);
export const TeamNotifications = createSelector(NotificationsGlobalSelector, _teamNotifications);
