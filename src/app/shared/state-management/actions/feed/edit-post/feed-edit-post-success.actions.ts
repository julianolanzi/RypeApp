import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";
import { PostCreateSuccess } from "src/app/models/feed/post-create-sucess";

export class FeedPostEditSuccessAction implements CustomAction<PostCreateSuccess> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_POST_EDIT_SUCCESS;

    constructor(public payload?: PostCreateSuccess) { }
    createAction(): any {
        return createAction(this.type);
    }
}