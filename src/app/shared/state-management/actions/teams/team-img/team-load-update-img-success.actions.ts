import { createAction } from '@ngrx/store';
import { CustomAction } from '../../custom.actions';
import { TeamMessageEnum } from '../team-message.enum';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';

export class TeamLoadUpdateSuccessImg implements CustomAction<TeamDataSuccess> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_IMG_SUCCESS;

  constructor(public payload?: TeamDataSuccess) {}
  createAction(): any {
    return createAction(this.type);
  }
}
