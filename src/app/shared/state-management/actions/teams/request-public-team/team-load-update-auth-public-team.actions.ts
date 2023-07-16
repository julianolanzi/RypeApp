import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";

export class TeamLoadUpdateAuthDataPublicTeam implements CustomAction<any> {
    readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_AUTH_ROLE;
  
    constructor(public payload?: any){}
    createAction(): any {
      return createAction(this.type);
    }
  }