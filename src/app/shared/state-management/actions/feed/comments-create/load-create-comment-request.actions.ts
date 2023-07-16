import { CreateComment } from "src/app/models/feed/comments/comments-create";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";



export class PostCommentsCreateRequestAction implements CustomAction<CreateComment> {
    readonly type: string = FeedMessageEnum.LOAD_CREATE_COMMENTS_POST_REQUEST;

    constructor(public payload?: CreateComment) { }
    createAction(): any {
        return createAction(this.type);
    }
}