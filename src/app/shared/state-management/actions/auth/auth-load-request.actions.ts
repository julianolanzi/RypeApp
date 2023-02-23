import { createAction } from '@ngrx/store';
import { UserLogin } from 'src/app/models/auth/user-login';
import { CustomAction } from './../custom.actions';
import { AuthMessageEnum } from './auth-message.enum';

export class LoadAuthRequestAction implements CustomAction<UserLogin> {
    readonly type: string = AuthMessageEnum.LOAD_AUTH_REQUEST;

    constructor( public payload?: UserLogin){}
    createAction():any {
        return createAction(this.type);
    }
}