import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { OverviewMessageEnum } from "./overview-message.enum";




export class OpGlobalErrorAction implements CustomAction<string> {
    readonly type: string = OverviewMessageEnum.LOAD_OVERVIEW_GLOBAL_ERROR;

    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}