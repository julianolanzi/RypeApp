import { createAction } from "@ngrx/store";
import { UpdateImg } from "src/app/models/account/user-update-img";
import { CustomAction } from "../custom.actions";
import { AccountMessageEnum } from "./account-message.enum";

export class AccountUpdateLoadImgRequestAction implements CustomAction<any> {
    readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_IMG_REQUEST;
  
    constructor(public payload?: any) {}
    createAction(): any {
      return createAction(this.type);
    }
  }