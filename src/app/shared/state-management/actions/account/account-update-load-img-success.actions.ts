import { createAction } from "@ngrx/store";
import { User } from "src/app/models/account/user";
import { CustomAction } from "../custom.actions";
import { AccountMessageEnum } from "./account-message.enum";

export class AccountUpdateLoadImgSuccessAction implements CustomAction<User> {
    readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_IMG_SUCCESS;

    constructor(public payload?: User) {}
    createAction(): any {
      return createAction(this.type);
    }
  }
