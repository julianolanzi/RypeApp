import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";


export class FeedDeletePostImgRequestAction implements CustomAction<string> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_DELETE_POST_IMAGE_REQUEST;

    constructor(public payload?: string) { }
    createAction(): any {
        return createAction(this.type);
    }
}