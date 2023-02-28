import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { GlobalMessageEnum } from "./global-pages-message.enum";


export class UpdateImgAccountAction implements CustomAction<any> {
    readonly type: string = GlobalMessageEnum.UPDATE_IMG_ACCOUNT;

    constructor(public payload?: any){}

    createAction():any {
        return createAction(this.type);
    }
}