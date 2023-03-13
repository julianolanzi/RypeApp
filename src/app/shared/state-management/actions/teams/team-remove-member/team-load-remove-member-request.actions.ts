import { createAction } from '@ngrx/store';
import { RemoveMembers } from 'src/app/models/teams/manage-team/team-remove-member';
import { TeamMessageEnum } from '../team-message.enum';
import { CustomAction } from './../../custom.actions';


export class TeamRemoveMemberRequestAction implements CustomAction<RemoveMembers> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_REMOVE_MEMBER_REQUEST;

  constructor(public payload?: RemoveMembers) {}
  createAction(): any {
    return createAction(this.type);
  }
}
