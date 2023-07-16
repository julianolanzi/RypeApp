import { createAction } from '@ngrx/store';
import { CustomAction } from './../custom.actions';
import { AuthMessageEnum } from './auth-message.enum';
import { UserLogin } from 'src/app/models/auth/login/user-login';

export class LoadAuthRequestAction implements CustomAction<UserLogin> {
  readonly type: string = AuthMessageEnum.LOAD_AUTH_REQUEST;

  constructor(public payload?: UserLogin) {}
  createAction(): any {
    return createAction(this.type);
  }
}
