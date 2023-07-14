import { ReactRequest } from "src/app/models/feed/reacts/react-request";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";


export class FeedReactRequestAction implements CustomAction<ReactRequest> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_REACT_POST_REQUEST;

    constructor(public payload?: ReactRequest) { }
    createAction(): any {
        return createAction(this.type);
    }
}