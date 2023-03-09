import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";




export class TeamLoadInfoRequestAction implements CustomAction<string> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_INFO_REQUEST;

  constructor(public payload?: string){}

  createAction(): any {
    return createAction(this.type);
  }
}
