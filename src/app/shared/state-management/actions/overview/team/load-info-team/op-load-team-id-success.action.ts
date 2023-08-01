import { createAction } from "@ngrx/store";
import { OverviewMessageEnum } from "../../overview-message.enum";
import { CustomAction } from "../../../custom.actions";
import { TeamDataSuccess } from "src/app/models/teams/load-team/team-data-sucess";



export class OpTeamIdSuccessAction implements CustomAction<TeamDataSuccess> {
    readonly type: string = OverviewMessageEnum.LOAD_TEAM_ID_SUCCESS;

    constructor(public payload?: TeamDataSuccess) { }

    createAction(): any {
        return createAction(this.type);
    }
}