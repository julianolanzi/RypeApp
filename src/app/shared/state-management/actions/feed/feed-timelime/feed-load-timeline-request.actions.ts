import { CustomAction } from "../../custom.actions";
import { FeedMessageEnum } from "../feed-message.enum";
import { createAction } from "@ngrx/store";
import { TimelineRequest } from "src/app/models/feed/timeline-request";



export class FeedTimelineRequestAction implements CustomAction<TimelineRequest> {
    readonly type: string = FeedMessageEnum.LOAD_FEED_TIMELINE_REQUEST;

    constructor(public payload?: TimelineRequest) { }
    createAction(): any {
        return createAction(this.type);
    }
}