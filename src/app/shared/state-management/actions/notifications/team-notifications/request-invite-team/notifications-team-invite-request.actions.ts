import { createAction } from '@ngrx/store';
import { RequestTeam } from 'src/app/models/notifications/notifications-request-team';
import { NotificationsEnum } from '../../notifications.enum';
import { CustomAction } from './../../../custom.actions';
export class InviteTeamNotificationsRequest
  implements CustomAction<RequestTeam>
{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_TEAM_REQUEST;
  constructor(public payload?: RequestTeam) {}

  createAction(): any {
    return createAction(this.type);
  }
}
