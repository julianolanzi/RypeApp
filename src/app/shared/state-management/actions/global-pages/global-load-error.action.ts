import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { GlobalMessageEnum } from "./global-pages-message.enum";


export class GlobalErrorAction implements CustomAction<any> {
    readonly type: string = GlobalMessageEnum.GLOBAL_ERROR;

    constructor(public payload?: any){}

    createAction():any {
        return createAction(this.type);
    }
}