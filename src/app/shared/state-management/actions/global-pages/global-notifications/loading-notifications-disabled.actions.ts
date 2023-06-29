import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { GlobalMessageEnum } from "../global-pages-message.enum";

export class LoadingNotificationsDisabledAction implements CustomAction<boolean> {
    readonly type: string = GlobalMessageEnum.NOTIFICATIONS_DISABLED;
    constructor(public payload?: boolean){}

    createAction():any {
        return createAction(this.type);
    }
}