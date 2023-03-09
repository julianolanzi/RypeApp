import { createAction } from '@ngrx/store';
import { TeamMessageEnum } from '../team-message.enum';
import { CustomAction } from '../../custom.actions';

export class TeamLoadAction implements CustomAction<string> {
  readonly type: string = TeamMessageEnum.LOAD_TEAM;

  constructor(public payload?: string) {}
  createAction(): any {
    return createAction(this.type);
  }
}
