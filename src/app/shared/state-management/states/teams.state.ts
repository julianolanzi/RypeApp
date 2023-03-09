import { CreateTeamSuccess } from "src/app/models/teams/create-team-success";
import { SearchTeamSuccess } from "src/app/models/teams/search-team-sucess";
import { TeamDataSuccess } from "src/app/models/teams/team-data-sucess";
import { SearchMemberSucess } from "src/app/models/teams/team-search-member-success";

export interface TeamState {
    team: CreateTeamSuccess,
    teamSearch: SearchTeamSuccess[],
    teamInfo: TeamDataSuccess,
    searchMembers: SearchMemberSucess[],
    authError?: Error,
    isLoadingTeam: boolean;
}
