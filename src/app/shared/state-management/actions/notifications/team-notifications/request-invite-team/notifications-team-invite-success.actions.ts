import { createAction } from '@ngrx/store';
import { NotificationsEnum } from '../../notifications.enum';
import { CustomAction } from './../../../custom.actions';
export class InviteTeamNotificationsSuccess
  implements CustomAction<string>
{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_TEAM_SUCCESS;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
