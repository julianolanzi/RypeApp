import { CreateTeamSuccess } from "src/app/models/teams/create-team/create-team-success";
import { SearchTeamSuccess } from "src/app/models/teams/search-team/search-team-sucess";
import { TeamDataSuccess } from "src/app/models/teams/load-team/team-data-sucess";
import { SearchMemberSucess } from "src/app/models/teams/search-members/team-search-member-success";

export interface TeamState {
    team: CreateTeamSuccess,
    teamSearch: SearchTeamSuccess[],
    teamInfo: TeamDataSuccess,
    searchMembers: SearchMemberSucess[],
    authError?: Error,
    isLoadingTeam: boolean;
}
