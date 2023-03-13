

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { catchError, map, of, exhaustMap } from 'rxjs';
import { AlertService } from 'src/app/services/utils/alert.service';
import { TeamService } from 'src/app/services/teams/team.service';

import { TeamMessageEnum } from '../actions/teams/team-message.enum';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { Store } from '@ngrx/store';
import { TeamLoadErrorAction } from '../actions/teams/team-load/team-load-error.actions';
import { TeamLoadSuccessAction } from '../actions/teams/team-load/team-load-success.actions';
import { Router } from '@angular/router';
import { TeamLoadSuccessPublicTeam } from '../actions/teams/team-load-success-public-team.actions';
import { TeamLoadErrorPublicTeam } from '../actions/teams/team-load-error-public-team.actions';
import { TeamLoadRequestPublicTeam } from '../actions/teams/team-load-request-public-team.actions';

import { TeamLoadInfoErrorAction } from '../actions/teams/update-team/team-load-info-error.actions';
import { TeamLoadUpdateRequestAction } from '../actions/teams/update/team-load-update-info.actions';
import { TeamLoadUpdateErrorAction } from '../actions/teams/update/team-load-error-info.actions';
import { TeamLoadUpdateSuccessAction } from '../actions/teams/update/team-load-success-info.actions';
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';
import { TeamLoadUpdateErrorImg } from '../actions/teams/team-img/team-load-update-img-error.actions';
import { TeamLoadCreateRequestAction } from '../actions/teams/create-team/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/create-team/team-load-create-success.actions';
import { TeamLoadCreateErrorAction } from '../actions/teams/create-team/team-load-create-error.actions';
import { TeamLoadAction } from '../actions/teams/team-load/team-load.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/update-team/team-load-info-request.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/update-team/team-load-info-success.actions';
import { TeamLoadUpdateRequestImg } from '../actions/teams/team-img/team-load-update-img-request.actions';
import { TeamLoadUpdateSuccessImg } from '../actions/teams/team-img/team-load-update-img-success.actions';
import { TeamLoadSearchMemberRequestAction } from '../actions/teams/search-members/team-load-search-member-request.actions';
import { UserService } from 'src/app/services/user/user.service';
import { TeamLoadSearchMemberErrorAction } from '../actions/teams/search-members/team-load-search-member-error.actions';
import { TeamLoadSearchMemberSuccessAction } from '../actions/teams/search-members/team-load-search-member-success.actions';
import { TeamRemoveMemberErrorAction } from '../actions/teams/team-remove-member/team-load-remove-member-error.actions';
import { TeamRemoveMemberRequestAction } from '../actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamRemoveMemberSuccessAction } from '../actions/teams/team-remove-member/team-load-remove-member-success.actions';

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

  updateInfoTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_UPDATE_REQUEST),
      exhaustMap((action: TeamLoadUpdateRequestAction) => {
        return this.teamService.updateInfoTeam(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadUpdateSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadUpdateErrorAction(error));
          })
        );
      })
    )
  );

  updateImgTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_UPDATE_IMG_REQUEST),
      exhaustMap((action: TeamLoadUpdateRequestImg) => {
        return this.imgService.uploadImgTeam(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadUpdateSuccessImg(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadUpdateErrorImg(error));
          })
        );
      })
    )
  );

  searchMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_SEARCH_MEMBER_REQUEST),
      exhaustMap((action: TeamLoadSearchMemberRequestAction) => {
        return this.userService.searchByUserKey(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            this.store.dispatch(new TeamLoadInfoRequestAction());
            return new TeamLoadSearchMemberSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadSearchMemberErrorAction(error));
          })
        )
      })
    )
  )

  removeMember$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TeamMessageEnum.LOAD_TEAM_REMOVE_MEMBER_REQUEST),
        exhaustMap((action: TeamRemoveMemberRequestAction) => {
            return this.teamService.quitMember(action.payload).pipe(
              map((response) => {
                this.store.dispatch(new LoadingDisabledAction());
                this.store.dispatch(new TeamLoadInfoRequestAction(action.payload?.idTeam));
                this.Alerts.success('Feito !', 'Membro removido com sucesso');
                return new TeamRemoveMemberSuccessAction(response);
              }),
              catchError((error) => {
                this.store.dispatch(new LoadingDisabledAction());
                const err = error.error.error;
                this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                return of(new TeamRemoveMemberErrorAction(error));
              })
            )
        })
      )
  )

  constructor(
    private actions$: Actions,
    private Alerts: AlertService,
    private teamService: TeamService,
    private userService: UserService,
    private store: Store,
    private router: Router,
    private imgService: UploadImgService
  ) {}
}
