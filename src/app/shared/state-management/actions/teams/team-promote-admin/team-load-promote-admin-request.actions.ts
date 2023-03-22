import { createAction } from "@ngrx/store";
import { PromoteAdmin } from "src/app/models/teams/manage-team/team-promote-admin";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";

export class TeamLoadPromoteAdminRequestAction implements CustomAction<PromoteAdmin> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_PROMOTE_ADMIN_REQUEST;

  constructor(public payload?: PromoteAdmin){}

  createAction(): any {
    return createAction(this.type)
  }
}
