import { createAction } from "@ngrx/store";
import { RemoveMembersSuccess } from "src/app/models/teams/manage-team/team-remove-member-success";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";




export class TeamRemoveMemberSuccessAction implements CustomAction<string> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_REMOVE_MEMBER_SUCCESS;

  constructor(public payload?: string) {}
  createAction(): any {
    return createAction(this.type);
  }
}
