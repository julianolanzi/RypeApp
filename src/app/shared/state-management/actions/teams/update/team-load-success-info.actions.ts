import { createAction } from "@ngrx/store";
import { TeamDataSuccess } from "src/app/models/teams/team-data-sucess";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";


export class TeamLoadUpdateSuccessAction
implements CustomAction<TeamDataSuccess>
{
readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_SUCCESS;
constructor(public payload?: TeamDataSuccess) {}

createAction(): any {
  return createAction(this.type);
}
}
