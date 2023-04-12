import { createAction } from '@ngrx/store';
import { NotificationsEnum } from '../../notifications.enum';
import { CustomAction } from './../../../custom.actions';
export class InviteTeamNotificationsError
  implements CustomAction<string>
{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_TEAM_ERROR;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
