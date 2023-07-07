import { PostRequest } from "src/app/models/feed/post";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";



export class FeedPostCreateRequestAction implements CustomAction<PostRequest> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_POST_REQUEST;

    constructor(public payload?: PostRequest) { }
    createAction(): any {
        return createAction(this.type);
    }
}