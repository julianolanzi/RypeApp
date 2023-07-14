import { PostRequest } from "src/app/models/feed/post";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";
import { EditPostRequest } from "src/app/models/feed/edit-post";

export class FeedPostEditRequestAction implements CustomAction<EditPostRequest> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_POST_EDIT_REQUEST;

    constructor(public payload?: EditPostRequest) { }
    createAction(): any {
        return createAction(this.type);
    }
}