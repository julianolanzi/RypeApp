import { AccountState } from './account.state';
import { AuthState } from "./auth.state";
import { FeedState } from './feeed.state';
import { GlobalPageState } from './global-pages.state';
import { NotificationsState } from './notifications.state';
import { TeamState } from './teams.state';


export interface GlobalState {
    globalPages: GlobalPageState;
    auth: AuthState;
    account: AccountState;
    team: TeamState;
    notifications: NotificationsState;
    feed: FeedState;
}
