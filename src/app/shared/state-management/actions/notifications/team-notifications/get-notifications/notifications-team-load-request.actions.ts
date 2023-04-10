import { createAction } from '@ngrx/store';
import { NotificationsEnum } from '../../notifications.enum';
import { CustomAction } from './../../../custom.actions';

export class TeamNotificationsGetRequest implements CustomAction<string> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_GET_TEAM_REQUEST;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
