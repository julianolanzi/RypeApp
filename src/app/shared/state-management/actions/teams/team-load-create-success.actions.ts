import { createAction } from "@ngrx/store";
import { CreateTeamSuccess } from "src/app/models/teams/create-team-success";
import { CustomAction } from "../custom.actions";
import { TeamMessageEnum } from "./team-message.enum";

export class TeamLoadCreateSuccessAction implements CustomAction<CreateTeamSuccess> {
    readonly type: string = TeamMessageEnum.LOAD_TEAM_CREATE_SUCCESS;
    constructor(public payload?: CreateTeamSuccess){}

    createAction():any {
        return createAction(this.type);
    }
}