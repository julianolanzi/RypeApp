import { createAction } from "@ngrx/store";
import { UserChangePass } from "src/app/models/account/user-change-pass";
import { CustomAction } from "../custom.actions";
import { AccountMessageEnum } from "./account-message.enum";

export class AccountUpdatePassLoadRequestAction implements CustomAction<UserChangePass> {
    readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_PASSWORD_REQUEST;
  
    constructor(public payload?: UserChangePass) {}
    createAction(): any {
      return createAction(this.type);
    }
  }
  