import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { TeamMessageEnum } from "./team-message.enum";



export class TeamLoadSuccessPublicTeam implements CustomAction<string> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_SECCESS_PUBLIC;

  constructor(public payload?: string){}
  createAction(): any {
    return createAction(this.type);
  }
}
