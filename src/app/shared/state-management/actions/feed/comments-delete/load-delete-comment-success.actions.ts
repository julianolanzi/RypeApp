import { LoadCommentsSuccess } from "src/app/models/feed/comments/comments-load-success";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";



export class PostCommentsDeleteSuccessAction implements CustomAction<LoadCommentsSuccess> {
    readonly type: string = FeedMessageEnum.LOAD_DELETE_COMMENTS_POST_SUCCESS;

    constructor(public payload?: LoadCommentsSuccess) { }
    createAction(): any {
        return createAction(this.type);
    }
}