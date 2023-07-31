import { LoadCommentsSuccess } from "src/app/models/feed/comments/comments-load-success";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";
import { PlayerSuccessResponse } from "src/app/models/overview-player/player/player-success-respose";
import { TeamDataSuccess } from "src/app/models/teams/load-team/team-data-sucess";

export interface OverviewState {
    id: string;
    idTeam: string;
    user: PlayerSuccessResponse,
    comments: LoadCommentsSuccess[],
    timeline: TimelineSuccess[],
    team: TeamDataSuccess,
    OverviewPlayerError?: Error,
}