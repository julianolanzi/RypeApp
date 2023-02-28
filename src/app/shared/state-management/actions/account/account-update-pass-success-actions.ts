import { createAction } from "@ngrx/store";
import { CustomAction } from "../custom.actions";
import { AccountMessageEnum } from "./account-message.enum";
import { UserSuccessResponse } from "src/app/models/account/user-success-response";
export class AccountUpdatePassLoadSuccessAction implements CustomAction<UserSuccessResponse> {
    readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_PASSWORD_SUCCESS;

    constructor(public payload?: UserSuccessResponse) {}
    createAction(): any {
      return createAction(this.type);
    }
  }
