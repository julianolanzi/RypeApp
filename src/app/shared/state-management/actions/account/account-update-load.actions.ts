import { createAction } from '@ngrx/store';
import { CustomAction } from '../custom.actions';
import { AccountMessageEnum } from './account-message.enum';

export class AccountUpdateLoadRequestAction
  implements CustomAction<any>
{
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_REQUEST;

  constructor(public payload?: any) {}
  createAction(): any {
    return createAction(this.type);
  }
}
