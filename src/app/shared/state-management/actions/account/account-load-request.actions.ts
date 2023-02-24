import { createAction } from '@ngrx/store';
import { CustomAction } from '../custom.actions';
import { AccountMessageEnum } from './account-message.enum';

export class AccountLoadRequestAction implements CustomAction<string> {
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT;

  constructor(public payload?: string) {}
  createAction(): any {
    return createAction(this.type);
  }
}
