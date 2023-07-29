import { createAction } from "@ngrx/store";
import { CustomAction } from "../../custom.actions";
import { GlobalMessageEnum } from "../global-pages-message.enum";


export class UpdateImgTeamAction implements CustomAction<any> {
    readonly type: string = GlobalMessageEnum.UPDATE_IMG_TEAM;

    constructor(public payload?: any){}

    createAction():any {
        return createAction(this.type);
    }
}