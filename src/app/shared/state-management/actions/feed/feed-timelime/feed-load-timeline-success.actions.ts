import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";
import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";



export class FeedTimelineSuccessAction implements CustomAction<TimelineSuccess> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_TIMELINE_SUCCESS;

    constructor(public payload?: TimelineSuccess) { }
    createAction(): any {
        return createAction(this.type);
    }
}