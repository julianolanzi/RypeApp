import { createAction } from "@ngrx/store";
import { SearchMemberSucess } from "src/app/models/teams/search-members/team-search-member-success";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";



export class TeamLoadSearchMemberSuccessAction implements CustomAction<SearchMemberSucess> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_SEARCH_MEMBER_SUCCESS;

  constructor(public payload?: SearchMemberSucess){}

  createAction(): any {
    return createAction(this.type)
  }
}
