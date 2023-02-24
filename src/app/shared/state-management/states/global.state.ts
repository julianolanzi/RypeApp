import { AccountState } from './account.state';
import { AuthState } from "./auth.state";


export interface GlobalState {
    auth?: AuthState;
    account: AccountState
}