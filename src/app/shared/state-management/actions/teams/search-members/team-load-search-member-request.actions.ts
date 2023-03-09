import { createAction } from '@ngrx/store';
import { TeamMessageEnum } from '../team-message.enum';
import { CustomAction } from './../../custom.actions';

export class TeamLoadSearchMemberRequestAction implements CustomAction<string> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_SEARCH_MEMBER_REQUEST;

  constructor(public payload?: string){}

  createAction(): any {
    return createAction(this.type)
  }
}
