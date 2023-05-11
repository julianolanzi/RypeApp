import { createAction } from '@ngrx/store';
import { CustomAction } from '../custom.actions';
import { AccountMessageEnum } from './account-message.enum';

export class AccountLoadGlobalErrorAction implements CustomAction<string> {
  readonly type: string = AccountMessageEnum.LOAD_GLOBAL_ERROR;

  constructor(public payload?: string) {}
  createAction(): any {
    return createAction(this.type);
  }
}
