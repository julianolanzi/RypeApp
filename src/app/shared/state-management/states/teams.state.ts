import { CreateTeamSuccess } from "src/app/models/teams/create-team-success";

export interface TeamState {
    team: CreateTeamSuccess,
    authError?: Error,
}