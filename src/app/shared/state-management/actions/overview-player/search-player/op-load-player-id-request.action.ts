import { createAction } from "@ngrx/store";
import { OverviewPlayerMessageEnum } from "../overview-player-message.enum";
import { CustomAction } from "../../custom.actions";



export class OpPlayerIdRequestAction implements CustomAction<string> {
    readonly type: string = OverviewPlayerMessageEnum.LOAD_PLAYER_ID_REQUEST;

    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}