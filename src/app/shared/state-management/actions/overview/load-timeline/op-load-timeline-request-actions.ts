import { createAction } from "@ngrx/store";
import { OverviewMessageEnum } from "../overview-message.enum";
import { CustomAction } from "../../custom.actions";



export class OpPlayerTimelineRequestAction implements CustomAction<string> {
    readonly type: string = OverviewMessageEnum.LOAD_PLAYER_TIMELINE_REQUEST;

    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}