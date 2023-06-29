import { TeamMessageEnum } from './../actions/teams/team-message.enum';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { catchError, map, of, exhaustMap } from 'rxjs';
import { AlertService } from 'src/app/services/utils/alert.service';
import { TeamService } from 'src/app/services/teams/team.service';

import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { Store } from '@ngrx/store';
import { TeamLoadSuccessAction } from '../actions/teams/team-load/team-load-success.actions';
import { Router } from '@angular/router';
import { TeamLoadRequestPublicTeam } from '../actions/teams/request-public-team/team-load-request-public-team.actions';

import { TeamLoadUpdateRequestAction } from '../actions/teams/update/team-load-update-info.actions';
import { TeamLoadUpdateSuccessAction } from '../actions/teams/update/team-load-success-info.actions';
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';
import { TeamLoadCreateRequestAction } from '../actions/teams/create-team/team-load-create-request.actions';
import { TeamLoadCreateSuccessAction } from '../actions/teams/create-team/team-load-create-success.actions';
import { TeamLoadAction } from '../actions/teams/team-load/team-load.actions';
import { TeamLoadInfoRequestAction } from '../actions/teams/update-team/team-load-info-request.actions';
import { TeamLoadInfoSuccessAction } from '../actions/teams/update-team/team-load-info-success.actions';
import { TeamLoadUpdateRequestImg } from '../actions/teams/team-img/team-load-update-img-request.actions';
import { TeamLoadUpdateSuccessImg } from '../actions/teams/team-img/team-load-update-img-success.actions';
import { TeamLoadSearchMemberRequestAction } from '../actions/teams/search-members/team-load-search-member-request.actions';
import { UserService } from 'src/app/services/user/user.service';
import { TeamLoadSearchMemberSuccessAction } from '../actions/teams/search-members/team-load-search-member-success.actions';
import { TeamRemoveMemberRequestAction } from '../actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamRemoveMemberSuccessAction } from '../actions/teams/team-remove-member/team-load-remove-member-success.actions';
import { TeamLoadPromoteAdminRequestAction } from '../actions/teams/team-promote-admin/team-load-promote-admin-request.actions';
import { TeamLoadPromoteAdminSuccessAction } from '../actions/teams/team-promote-admin/team-load-promote-admin-success.actions';
import { TeamLoadRemoveAdminRequestAction } from '../actions/teams/remove-admin/team-load-remove-admin-request.actions';
import { TeamLoadRemoveAdminSuccessAction } from '../actions/teams/remove-admin/team-load-remove-admin-success.actions';
import { TeamLoadGlobalErrorAction } from '../actions/teams/team-load-global-error.actions';
import { TeamLoadSuccessPublicTeam } from '../actions/teams/request-public-team/team-load-success-public-team.actions';
import { TeamLoadQuitRequestAction } from '../actions/teams/quit-team/team-load-quit-request.actions';
import { TeamLoadQuitSuccessAction } from '../actions/teams/quit-team/team-load-quit-success.actions';
import { TeamLoadUpdateAuthDataPublicTeam } from '../actions/teams/request-public-team/team-load-update-auth-public-team.actions';
import { LoadingSmallDisabledAction } from '../actions/global-pages/global-loading-small/loading-small-disabled.actions';

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
            }, 2000);
            this.Alerts.success('Time criado com sucesso', 'Parabéns');
            this.store.dispatch(new LoadingDisabledAction());
            return new TeamLoadCreateSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
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
            this.store.dispatch(new LoadingSmallDisabledAction())
            return new TeamLoadSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingSmallDisabledAction())
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
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
          map((response) => {
            this.store.dispatch(new TeamLoadUpdateAuthDataPublicTeam(action.payload.team));
            setTimeout(() => {
              this.router.navigate(['team-overview']);
            }, 2000);
            this.store.dispatch(new LoadingDisabledAction());
            this.Alerts.success('Agora voce faz parte do time', 'Parabéns');
            return new TeamLoadSuccessPublicTeam();
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
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
            return of(new TeamLoadGlobalErrorAction(error));
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
            this.Alerts.success('Atualização realizada com sucesso', 'Feito !');
            return new TeamLoadUpdateSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
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
            this.Alerts.success('Foto Atualizada com sucesso', 'Feito !');
            return new TeamLoadUpdateSuccessImg(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
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
            this.store.dispatch(new LoadingSmallDisabledAction())

            return new TeamLoadSearchMemberSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingSmallDisabledAction())
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  removeMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_REMOVE_MEMBER_REQUEST),
      exhaustMap((action: TeamRemoveMemberRequestAction) => {
        return this.teamService.quitMember(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            this.store.dispatch(
              new TeamLoadInfoRequestAction(action.payload?.idTeam)
            );
            this.Alerts.success('Feito !', 'Membro removido com sucesso');
            return new TeamRemoveMemberSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  promoteAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_PROMOTE_ADMIN_REQUEST),
      exhaustMap((action: TeamLoadPromoteAdminRequestAction) => {
        return this.teamService.updateMemberTeam(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            this.store.dispatch(
              new TeamLoadInfoRequestAction(action.payload?.idTeam)
            );
            this.Alerts.success('Membro Promovido a Admin', 'Feito !');
            return new TeamLoadPromoteAdminSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  removeAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamMessageEnum.LOAD_TEAM_REMOVE_ADMIN_REQUEST),
      exhaustMap((action: TeamLoadRemoveAdminRequestAction) => {
        return this.teamService.removeAdminTeam(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingDisabledAction());
            this.store.dispatch(
              new TeamLoadInfoRequestAction(action.payload?.idTeam)
            );
            this.Alerts.success('admin rebaixado a membro', 'Feito !');
            return new TeamLoadRemoveAdminSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new TeamLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  quiteTeam$ = createEffect(() => this.actions$.pipe(
    ofType(TeamMessageEnum.LOAD_TEAM_QUIT_REQUEST),
    exhaustMap((action: TeamLoadQuitRequestAction) => {
      return this.teamService.quitTeam(action.payload).pipe(
        map((response) =>{
          this.store.dispatch(new LoadingDisabledAction());
          console.log('chegando na action');
          return new TeamLoadQuitSuccessAction(response);
        }),
        catchError((error) => {
          this.store.dispatch(new LoadingDisabledAction());
          const err = error.error.error;
          this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
          return of(new TeamLoadGlobalErrorAction(error));
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private Alerts: AlertService,
    private teamService: TeamService,
    private userService: UserService,
    private store: Store,
    private router: Router,
    private imgService: UploadImgService
  ) { }
}
