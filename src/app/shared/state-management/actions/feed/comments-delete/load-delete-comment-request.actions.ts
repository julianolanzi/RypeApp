import { CreateComment } from "src/app/models/feed/comments/comments-create";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";
import { DeleteComment } from "src/app/models/feed/comments/comments-delete";



export class PostCommentsDeleteRequestAction implements CustomAction<DeleteComment> {
    readonly type: string = FeedMessageEnum.LOAD_DELETE_COMMENTS_POST_REQUEST;

    constructor(public payload?: DeleteComment) { }
    createAction(): any {
        return createAction(this.type);
    }
}