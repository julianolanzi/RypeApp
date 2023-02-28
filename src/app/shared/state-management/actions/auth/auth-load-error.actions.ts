import { createAction } from '@ngrx/store';
import { CustomAction } from './../custom.actions';
import { AuthMessageEnum } from './auth-message.enum';


export class LoadAuthErrorAction implements CustomAction<string> {
    readonly type: string = AuthMessageEnum.LOAD_AUTH_ERROR;

    constructor(public payload?: string){}

    createAction():any {
        return createAction(this.type);
    }
}