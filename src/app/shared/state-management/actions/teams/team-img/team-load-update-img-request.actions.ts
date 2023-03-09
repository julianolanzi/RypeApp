import { createAction } from '@ngrx/store';
import { TeamMessageEnum } from '../team-message.enum';
import { CustomAction } from './../../custom.actions';

export class TeamLoadUpdateRequestImg implements CustomAction<any> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM_UPDATE_IMG_REQUEST;

  constructor(public payload?: any) {}
  createAction(): any {
    return createAction(this.type);
  }
}
