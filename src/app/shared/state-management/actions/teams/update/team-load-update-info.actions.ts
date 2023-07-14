import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";
import { TeamUpdateInfoRequest } from "src/app/models/teams/team-update/team-update-request";


export class TeamLoadUpdateRequestAction
implements CustomAction<TeamUpdateInfoRequest>
{
readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_REQUEST;
constructor(public payload?: TeamUpdateInfoRequest) {}

createAction(): any {
  return createAction(this.type);
}
}
