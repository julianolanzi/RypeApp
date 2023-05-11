import { createAction } from "@ngrx/store";
import { CustomAction } from "../../../custom.actions";
import { NotificationsEnum } from "../../notifications.enum";


export class QuestionTeamNotificationsSuccess implements CustomAction<string>{
  readonly type: string =
    NotificationsEnum.LOAD_NOTIFICATIONS_QUESTION_TEAM_SUCCESS;
  constructor(public payload?: string) {}

  createAction(): any {
    return createAction(this.type);
  }
}
