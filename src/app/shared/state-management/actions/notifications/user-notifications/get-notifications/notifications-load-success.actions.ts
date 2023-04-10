import { createAction } from "@ngrx/store";
import { UserNotificationsSuccess } from "src/app/models/notifications/notifications-user-success";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";

export class NotificationsGetUserSuccess implements CustomAction<UserNotificationsSuccess> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_GET_USER_SUCCESS;

  constructor(public payload?: UserNotificationsSuccess) {}

  createAction(): any {
    return createAction(this.type);
  }
}
