import { TeamLoadCreateRequestAction } from '../actions/teams/team-load-create-request.actions';
import { TeamLoadCreateErrorAction } from '../actions/teams/team-load-create-error.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/team-load-create-success.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { switchMap, catchError, map, of, exhaustMap } from 'rxjs';
import { AlertService } from 'src/app/services/utils/alert.service';
import { TeamService } from 'src/app/services/teams/team.service';

import { TeamMessageEnum } from '../actions/teams/team-message.enum';

@Injectable({
  providedIn: 'root',
})
export class TeamEffect {



    create$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_CREATE_REQUEST),
      exhaustMap((action: TeamLoadCreateRequestAction) => {
        return this.teamService.createTeam(action.payload).pipe(
          map((response) => {
            return new TeamLoadCreateSuccessAction(response);
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadCreateErrorAction(error));
          })
        );
      })
    ));

  constructor(
    private actions$: Actions,
    private Alerts: AlertService,
    private teamService: TeamService
  ) {}
}
