import { createAction } from '@ngrx/store';
import { CreateTeamRequest } from 'src/app/models/teams/create-team/create-team-request';
import { CustomAction } from '../../custom.actions';
import { TeamMessageEnum } from '../team-message.enum';


export class TeamLoadCreateRequestAction implements CustomAction<CreateTeamRequest> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_CREATE_REQUEST;

  constructor(public payload?: CreateTeamRequest) {}

  createAction(): any {
    return createAction(this.type);
  }
}
