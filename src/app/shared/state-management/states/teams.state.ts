import { SearchTeamSuccess } from "src/app/models/teams/search-team/search-team-sucess";
import { TeamDataSuccess } from "src/app/models/teams/load-team/team-data-sucess";
import { SearchMemberSucess } from "src/app/models/teams/search-members/team-search-member-success";

export interface TeamState {
    team: TeamDataSuccess,
    teamSearch: SearchTeamSuccess[],
    searchMembers: SearchMemberSucess[],
    authError?: Error,
    isLoadingTeam: boolean;
}
