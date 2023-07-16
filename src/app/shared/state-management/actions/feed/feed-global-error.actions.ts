import { CustomAction } from "../custom.actions";
import { FeedMessageEnum } from "./feed-message.enum";
import { createAction } from '@ngrx/store';



export class FeedLoadGlobalErrorAction implements CustomAction<string> {
    readonly type: string = FeedMessageEnum.LOAD_GLOBAL_ERROR;
  
    constructor(public payload?: string) {}
    createAction(): any {
      return createAction(this.type);
    }
  }