import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { OverviewPlayerMessageEnum } from "./overview-player-message.enum";




export class OpGlobalErrorAction implements CustomAction<string> {
    readonly type: string = OverviewPlayerMessageEnum.LOAD_OVERVIEW_GLOBAL_ERROR;

    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}