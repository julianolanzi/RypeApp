import { createAction } from "@ngrx/store";
import { SearchTeamSuccess } from "src/app/models/teams/search-team-sucess";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";


export class TeamLoadSuccessAction implements CustomAction<SearchTeamSuccess> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_SUCCESS;

  constructor(public payload?: SearchTeamSuccess) {}
  createAction(): any {
    return createAction(this.type);
  }
}
