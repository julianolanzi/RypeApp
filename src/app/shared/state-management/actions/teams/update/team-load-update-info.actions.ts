import { createAction } from "@ngrx/store";
import { TeamUpdateInfo } from "src/app/models/teams/team-update-request";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";


export class TeamLoadUpdateRequestAction
implements CustomAction<TeamUpdateInfo>
{
readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_REQUEST;
constructor(public payload?: TeamUpdateInfo) {}

createAction(): any {
  return createAction(this.type);
}
}
