import { createAction } from "@ngrx/store";
import { OverviewPlayerMessageEnum } from "../overview-player-message.enum";
import { CustomAction } from "../../custom.actions";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";



export class OpPlayerTimelineSuccessAction implements CustomAction<TimelineSuccess> {
    readonly type: string = OverviewPlayerMessageEnum.LOAD_PLAYER_TIMELINE_SUCCESS;

    constructor(public payload?: TimelineSuccess) { }

    createAction(): any {
        return createAction(this.type);
    }
}