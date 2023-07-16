import { createAction } from "@ngrx/store";
import { OverviewPlayerMessageEnum } from "../overview-player-message.enum";
import { CustomAction } from "../../custom.actions";



export class LoadOpRoutingIdAction implements CustomAction<string> {
    readonly type: string = OverviewPlayerMessageEnum.LOAD_ROUTING_ID;
  
    constructor(public payload?: string) {}
    createAction(): any {
      return createAction(this.type);
    }
  }
  