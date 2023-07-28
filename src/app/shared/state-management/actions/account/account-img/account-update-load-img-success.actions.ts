import { createAction } from '@ngrx/store';

import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { CustomAction } from '../../custom.actions';
import { AccountMessageEnum } from '../account-message.enum';

export class AccountUpdateLoadImgSuccessAction implements CustomAction<any> {
  readonly type: string = AccountMessageEnum.LOAD_ACCOUNT_UPDATE_IMG_SUCCESS;

  constructor(public payload?: any) {}
  createAction(): any {
    return createAction(this.type);
  }
}
