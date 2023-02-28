import { UserSuccessResponse } from "src/app/models/account/user-success-response";
export interface AccountState {
    account: UserSuccessResponse;
    authError?: Error;
    ischange: boolean;
  }
