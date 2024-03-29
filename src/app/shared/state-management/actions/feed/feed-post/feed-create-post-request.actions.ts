import { PostCreateRequest } from "src/app/models/feed/create-post/post-create-request";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";

export class FeedPostCreateRequestAction implements CustomAction<PostCreateRequest> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_POST_REQUEST;

    constructor(public payload?: PostCreateRequest) { }
    createAction(): any {
        return createAction(this.type);
    }
}