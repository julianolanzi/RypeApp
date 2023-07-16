import { createAction } from '@ngrx/store';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { CustomAction } from '../../custom.actions';
import { AccountMessageEnum } from '../account-message.enum';


export class AccountLoadSuccessAction implements CustomAction<UserSuccessResponse> {
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_SUCCESS;

  constructor(public payload?: UserSuccessResponse) {}
  createAction(): any {
    return createAction(this.type);
  }
}
