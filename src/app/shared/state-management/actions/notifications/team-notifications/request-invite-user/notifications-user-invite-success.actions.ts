import { createAction } from "@ngrx/store";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";

export class InviteUserNotificationsSuccess implements CustomAction<string>{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_USER_SUCCESS;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
