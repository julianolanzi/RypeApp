import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";



export class PostCommentsLoadClearAction implements CustomAction<any> {
    readonly type: string = FeedMessageEnum.LOAD_COMMENTS_POST_CLEAR;

    constructor(public payload?: any) { }
    createAction(): any {
        return createAction(this.type);
    }
}