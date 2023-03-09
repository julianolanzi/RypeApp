import { createAction } from '@ngrx/store';
import { CreateTeam } from 'src/app/models/teams/create-team';
import { CustomAction } from '../../custom.actions';
import { TeamMessageEnum } from '../team-message.enum';


export class TeamLoadCreateRequestAction implements CustomAction<CreateTeam> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_CREATE_REQUEST;

  constructor(public payload?: CreateTeam) {}

  createAction(): any {
    return createAction(this.type);
  }
}
