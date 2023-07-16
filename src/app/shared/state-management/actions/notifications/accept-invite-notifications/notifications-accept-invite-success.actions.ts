import { TeamNotificationsSuccess } from "src/app/models/notifications/notifications-team-success";
import { CustomAction } from "../../custom.actions";
import { NotificationsEnum } from "../notifications.enum";
import { createAction } from "@ngrx/store";


export class AcceptInviteNotificationsSucess implements CustomAction<string> {
    readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_ACCEPT_INVITE_SUCCESS;
    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}