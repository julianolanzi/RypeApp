import { createAction } from "@ngrx/store";
import { RequestQuestionUser } from "src/app/models/notifications/notifications-request-question-user";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";


export class QuestionUserNotificationsRequest implements CustomAction<RequestQuestionUser>{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_QUESTION_USER_REQUEST;
  constructor(public payload?: RequestQuestionUser) {}

  createAction(): any {
    return createAction(this.type);
  }
}
