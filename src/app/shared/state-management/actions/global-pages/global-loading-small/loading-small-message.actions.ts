import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { GlobalMessageEnum } from "../global-pages-message.enum";

export class LoadingSmallMessageAction implements CustomAction<string> {
    readonly type: string = GlobalMessageEnum.LOADING_SMALL_MESSAGE;
    constructor(public payload?: string){}

    createAction():any {
        return createAction(this.type);
    }
}