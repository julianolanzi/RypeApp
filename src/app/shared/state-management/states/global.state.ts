import { AccountState } from './account.state';
import { AuthState } from "./auth.state";
import { GlobalPageState } from './global-pages.state';
import { TeamState } from './teams.state';


export interface GlobalState {
    globalPages: GlobalPageState;
    auth: AuthState;
    account: AccountState;
    team: TeamState;
}