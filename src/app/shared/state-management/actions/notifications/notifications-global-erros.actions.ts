import { createAction } from '@ngrx/store';
import { CustomAction } from '../custom.actions';
import { NotificationsEnum } from './notifications.enum';


export class NotificationGlobalError implements CustomAction<string> {
  readonly type: string = NotificationsEnum.LOAD_NOTIFICATIONS_GLOBAL_ERROR;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
