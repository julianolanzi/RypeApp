import { createAction } from "@ngrx/store";
import { UserChangePassRequest } from "src/app/models/account/change-password/user-change-password-request";
import { CustomAction } from "../../custom.actions";
import { AccountMessageEnum } from "../account-message.enum";

export class AccountUpdatePassLoadRequestAction implements CustomAction<UserChangePassRequest> {
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_PASSWORD_REQUEST;

  constructor(public payload?: UserChangePassRequest) { }
  createAction(): any {
    return createAction(this.type);
  }
}
