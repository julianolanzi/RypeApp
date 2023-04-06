import { createAction } from "@ngrx/store";
import { RemoveAdmin } from "src/app/models/teams/manage-team/team-remove-admin";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";

export class TeamLoadRemoveAdminRequestAction implements CustomAction<RemoveAdmin> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_REMOVE_ADMIN_REQUEST;

  constructor(public payload?: RemoveAdmin){}

  createAction(): any {
    return createAction(this.type)
  }
}
