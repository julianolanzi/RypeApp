

import { createAction } from '@ngrx/store';
import { TeamNotificationsSuccess } from 'src/app/models/notifications/notifications-team-success';
import { NotificationsEnum } from '../../notifications.enum';
import { CustomAction } from './../../../custom.actions';

export class TeamNotificationsGetSuccess implements CustomAction<TeamNotificationsSuccess> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_GET_TEAM_SUCCESS;
  constructor(public payload?: TeamNotificationsSuccess) {}

  createAction(): any {
    return createAction(this.type);
  }
}
