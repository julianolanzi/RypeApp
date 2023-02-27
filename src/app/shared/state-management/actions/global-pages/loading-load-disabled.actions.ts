import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { GlobalMessageEnum } from "./global-pages-message.enum";


export class LoadingDisabledAction implements CustomAction<boolean> {
    readonly type: string = GlobalMessageEnum.LOADING_DISABLED;
    
    constructor(public payload?: boolean){}
    
    createAction():any {
        return createAction(this.type);
    }
}