import { createAction } from '@ngrx/store';
import { NotificationsEnum } from '../notifications.enum';
import { CustomAction } from './../../custom.actions';

export class DeleteNotificationsSuccess implements CustomAction<string> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_DELETE_SUCCESS;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}



