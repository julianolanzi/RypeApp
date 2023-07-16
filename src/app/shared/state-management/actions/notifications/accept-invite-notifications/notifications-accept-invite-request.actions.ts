import { CustomAction } from "../../custom.actions";
import { NotificationsEnum } from "../notifications.enum";
import { createAction } from "@ngrx/store";
import { UserNotificationsSuccess } from "src/app/models/notifications/notifications-user-success";


export class AcceptInviteNotificationsRequest implements CustomAction<UserNotificationsSuccess> {
    readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_ACCEPT_INVITE_REQUEST;
    constructor(public payload?: UserNotificationsSuccess) { }

    createAction(): any {
        return createAction(this.type);
    }
}