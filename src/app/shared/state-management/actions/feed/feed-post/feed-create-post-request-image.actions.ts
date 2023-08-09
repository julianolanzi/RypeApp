import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";

export class FeedPostCreateImageRequestAction implements CustomAction<any> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_POST_IMAGE_REQUEST;

    constructor(public payload?: any) { }
    createAction(): any {
        return createAction(this.type);
    }
}