import { createAction } from "@ngrx/store";
import { RequestQuestionTeam } from "src/app/models/notifications/notifications-request-question-team";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";


export class QuestionTeamNotificationsRequest implements CustomAction<RequestQuestionTeam>{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_QUESTION_TEAM_REQUEST;
  constructor(public payload?: RequestQuestionTeam) {}

  createAction(): any {
    return createAction(this.type);
  }
}
