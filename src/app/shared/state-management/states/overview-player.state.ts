import { LoadCommentsSuccess } from "src/app/models/feed/comments/comments-load-success";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";
import { PlayerSuccessResponse } from "src/app/models/overview-player/player/player-success-respose";

export interface OverviewPlayerState {
    id: string;
    user: PlayerSuccessResponse,
    comments: LoadCommentsSuccess[],
    timeline: TimelineSuccess[],
    OverviewPlayerError?: Error,
}