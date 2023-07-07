import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";
import { TimelineSuccess } from "src/app/models/feed/timeline-success";


export class FeedReactSucessAction implements CustomAction<TimelineSuccess> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_REACT_POST_SUCCESS;

    constructor(public payload?: TimelineSuccess) { }
    createAction(): any {
        return createAction(this.type);
    }
}