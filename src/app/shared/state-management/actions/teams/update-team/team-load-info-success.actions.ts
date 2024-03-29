import { createAction } from "@ngrx/store";
import { TeamDataSuccess } from "src/app/models/teams/load-team/team-data-sucess";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";



export class TeamLoadInfoSuccessAction implements CustomAction<TeamDataSuccess> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_INFO_SUCCESS;

  constructor(public payload?: TeamDataSuccess){}

  createAction(): any {
    return createAction(this.type);
  }
}
