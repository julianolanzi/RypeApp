import { TeamLoadCreateRequestAction } from '../actions/teams/team-load-create-request.actions';
import { TeamLoadCreateErrorAction } from '../actions/teams/team-load-create-error.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/team-load-create-success.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { catchError, map, of, exhaustMap } from 'rxjs';
import { AlertService } from 'src/app/services/utils/alert.service';
import { TeamService } from 'src/app/services/teams/team.service';

import { TeamMessageEnum } from '../actions/teams/team-message.enum';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { Store } from '@ngrx/store';
import { TeamLoadAction } from '../actions/teams/team-load.actions';
import { TeamLoadErrorAction } from '../actions/teams/team-load-error.actions';
import { TeamLoadSuccessAction } from '../actions/teams/team-load-success.actions';
import { Router } from '@angular/router';
import { TeamLoadSuccessPublicTeam } from '../actions/teams/team-load-success-public-team.actions';
import { TeamLoadErrorPublicTeam } from '../actions/teams/team-load-error-public-team.actions';
import { TeamLoadRequestPublicTeam } from '../actions/teams/team-load-request-public-team.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/team-load-info-success.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/team-load-info-request.actions';
import { TeamLoadInfoErrorAction } from '../actions/teams/team-load-info-error.actions';

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
            setTimeout(() => {
              this.router.navigate(['team-overview']);
            }, 3000);
            this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadCreateSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadCreateErrorAction(error));
          })
        );
      })
    )
  );

  searcTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM),
      exhaustMap((action: TeamLoadAction) => {
        return this.teamService.searchTeams(action.payload).pipe(
          map((response) => {
            return new TeamLoadSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadErrorAction(error));
          })
        );
      })
    )
  );

  joinPublicTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_REQUEST_PUBLIC),
      exhaustMap((action: TeamLoadRequestPublicTeam) => {
        return this.teamService.joinTeam(action.payload).pipe(
          map((respnse) => {
            setTimeout(() => {
              this.router.navigate(['team-overview']);
            }, 2000);
            this.Alerts.success('Agora voce faz parte do time', 'Parabéns');
            return new TeamLoadSuccessPublicTeam();
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadErrorPublicTeam(error));
          })
        );
      })
    )
  );

  getInfoTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_INFO_REQUEST),
      exhaustMap((action: TeamLoadInfoRequestAction) => {
        return this.teamService.getById(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadInfoSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadInfoErrorAction(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private Alerts: AlertService,
    private teamService: TeamService,
    private store: Store,
    private router: Router
  ) {}
}
