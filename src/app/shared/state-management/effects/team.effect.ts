import { TeamLoadCreateRequestAction } from '../actions/teams/team-load-create-request.actions';
import { TeamLoadCreateErrorAction } from '../actions/teams/team-load-create-error.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/team-load-create-success.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { TeamMessageEnum } from '../actions/teams/team-message.enum';
import { switchMap, catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';
import { AlertService } from 'src/app/services/utils/alert.service';
import { TeamService } from 'src/app/services/teams/team.service';

import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';

@Injectable({
  providedIn: 'root',
})
export class TeamEffect {
  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_CREATE),
      switchMap((action: TeamLoadCreateRequestAction) => {
        return this.TeamService.createTeam(action.payload).pipe(
          map((response) => {
            setTimeout(() => {
              this.router.navigate(['/team-overview']);
            }, 4000);
            // this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadCreateSuccessAction(response);
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadCreateErrorAction(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private Alerts: AlertService,
    private imgService: UploadImgService,
    private TeamService: TeamService
  ) {}
}
