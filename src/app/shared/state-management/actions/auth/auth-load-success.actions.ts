import { createAction } from '@ngrx/store';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { CustomAction } from './../custom.actions';
import { AuthMessageEnum } from './auth-message.enum';


export class LoadAuthSuccessAction implements CustomAction<UserLoginSuccess> {
    readonly type: string = AuthMessageEnum.LOAD_AUTH_SUCCESS;

    constructor(public payload?: UserLoginSuccess){}

    createAction():any {
        return createAction(this.type);
    }
}