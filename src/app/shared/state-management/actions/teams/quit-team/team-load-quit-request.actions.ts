import { CustomAction } from "../../custom.actions";
import { TeamMessageEnum } from "../team-message.enum";
import { createAction } from '@ngrx/store';

export class TeamLoadQuitRequestAction implements CustomAction<string> {
    readonly type: string = TeamMessageEnum.LOAD_TEAM_QUIT_REQUEST;
  
    constructor(public payload?: string) {}
  
    createAction(): any {
      return createAction(this.type);
    }
  }