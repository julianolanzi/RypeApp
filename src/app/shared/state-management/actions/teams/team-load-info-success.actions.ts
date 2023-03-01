import { TeamDataSuccess } from './../../../../models/teams/team-data-sucess';
import { TeamData } from 'src/app/models/teams/team-data';
import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { TeamMessageEnum } from "./team-message.enum";


export class TeamLoadInfoSuccessAction implements CustomAction<TeamDataSuccess> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_INFO_SUCCESS;

  constructor(public payload?: TeamDataSuccess){}

  createAction(): any {
    return createAction(this.type);
  }
}
