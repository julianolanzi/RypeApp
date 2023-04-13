import { createAction } from "@ngrx/store";
import { RequestInviteUser } from "src/app/models/notifications/notifications-request-invite-user";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";


export class InviteUserNotificationsRequest implements CustomAction<RequestInviteUser>{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_USER_REQUEST;
  constructor(public payload?: RequestInviteUser) {}

  createAction(): any {
    return createAction(this.type);
  }
}
