import { User } from "src/app/models/account/user";


export interface AccountState {
    account: User;
    authError?: Error;
    loading: boolean;
    ischange: boolean;
  }
  