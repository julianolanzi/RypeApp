import { createAction } from '@ngrx/store';
import { CustomAction } from '../custom.actions';
import { AccountMessageEnum } from './account-message.enum';

export class AccountResetLoadAction implements CustomAction<void> {
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_RESET;


  createAction(): any {
    return createAction(this.type);
  }
}
