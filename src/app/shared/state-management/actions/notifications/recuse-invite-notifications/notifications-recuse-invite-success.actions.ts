import { CustomAction } from "../../custom.actions";
import { NotificationsEnum } from "../notifications.enum";
import { createAction } from "@ngrx/store";
import { UserNotificationsSuccess } from "src/app/models/notifications/notifications-user-success";


export class RecuseInviteNotificationsSuccess implements CustomAction<string> {
    readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_RECUSE_INVITE_SUCCESS;
    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}