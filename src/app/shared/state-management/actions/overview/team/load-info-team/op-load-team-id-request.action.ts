import { createAction } from "@ngrx/store";
import { OverviewMessageEnum } from "../../overview-message.enum";
import { CustomAction } from "../../../custom.actions";



export class OpTeamIdRequestAction implements CustomAction<string> {
    readonly type: string = OverviewMessageEnum.LOAD_TEAM_ID_REQUEST;

    constructor(public payload?: string) { }

    createAction(): any {
        return createAction(this.type);
    }
}