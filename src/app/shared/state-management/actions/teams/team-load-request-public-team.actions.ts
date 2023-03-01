import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { TeamMessageEnum } from "./team-message.enum";

export class TeamLoadRequestPublicTeam implements CustomAction<any> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_REQUEST_PUBLIC;

  constructor(public payload?: any){}
  createAction(): any {
    return createAction(this.type);
  }
}
