import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { GlobalMessageEnum } from "../global-pages-message.enum";

export class LoadingSmallActiveAction implements CustomAction<any> {
    readonly type: string = GlobalMessageEnum.LOADING_SMALL_ACTIVE;
    constructor(public payload?: any){}
    
    createAction():any {
        return createAction(this.type);
    }
}