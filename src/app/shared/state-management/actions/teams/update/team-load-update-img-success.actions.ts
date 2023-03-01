import { TeamData } from 'src/app/models/teams/team-data';
import { createAction } from '@ngrx/store';
import { CustomAction } from '../../custom.actions';
import { TeamMessageEnum } from '../team-message.enum';

export class TeamLoadUpdateSuccessImg implements CustomAction<TeamData> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_IMG_SUCCESS;

  constructor(public payload?: TeamData) {}
  createAction(): any {
    return createAction(this.type);
  }
}
