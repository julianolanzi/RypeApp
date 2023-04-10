import { createAction } from "@ngrx/store";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";


export class NotificationsGetUserRequest implements CustomAction<string> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_GET_USER_REQUEST;

  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
