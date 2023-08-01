import { createAction } from "@ngrx/store";
import { OverviewMessageEnum } from "../../overview-message.enum";
import { CustomAction } from "../../../custom.actions";



export class LoadOpRoutingTeamIdAction implements CustomAction<string> {
    readonly type: string = OverviewMessageEnum.LOAD_ROUTING_TEAM_ID;
  
    constructor(public payload?: string) {}
    createAction(): any {
      return createAction(this.type);
    }
  }
  