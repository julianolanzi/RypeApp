import { NotificationsGetUserSuccess } from './../actions/notifications/user-notifications/get-notifications/notifications-load-success.actions';
import { exhaustMap, catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { AlertService } from 'src/app/services/utils/alert.service';
import { NotificationsEnum } from '../actions/notifications/notifications.enum';
import { NotificationsGetUserRequest } from '../actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { TeamNotificationsGetRequest } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-request.actions';
import { TeamNotificationsGetSuccess } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-success.actions';
import { DeleteNotificationsSuccess } from '../actions/notifications/delete-notifications/notifications-delete-load-success.actions';
import { DeleteNotificationsRequest } from '../actions/notifications/delete-notifications/notifications-delete-load-request.actions';
import { InviteTeamNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { InviteTeamNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-success.actions';
import { InviteUserNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-user/notifications-user-invite-request.actions';
import { InviteUserNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-user/notifications-user-invite-success.actions';
import { QuestionTeamNotificationsRequest } from '../actions/notifications/team-notifications/update-notifications/notifications-team-question-request.actions';
import { QuestionTeamNotificationsSuccess } from '../actions/notifications/team-notifications/update-notifications/notifications-team-question-success.actions';
import { NotificationGlobalError } from '../actions/notifications/notifications-global-erros.actions';
import { AcceptInviteNotificationsRequest } from '../actions/notifications/accept-invite-notifications/notifications-accept-invite-request.actions';
import { AcceptInviteNotificationsSucess } from '../actions/notifications/accept-invite-notifications/notifications-accept-invite-success.actions';
import { RecuseInviteNotificationsRequest } from '../actions/notifications/recuse-invite-notifications/notifications-recuse-invite-request.actions';
import { RecuseInviteNotificationsSuccess } from '../actions/notifications/recuse-invite-notifications/notifications-recuse-invite-success.actions';
import { AcceptInviteNotificationsTeamUserReducer } from '../actions/notifications/accept-invite-notifications/notifications-aceept-reducer.actions';
import { LoadingSmallDisabledAction } from '../actions/global-pages/global-loading-small/loading-small-disabled.actions';

@Injectable({
  providedIn: 'root',
})
export class NotificationsEffect {
  getuserNf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_GET_USER_REQUEST),
      exhaustMap((action: NotificationsGetUserRequest) => {
        return this.notificaService.getUserNotifications(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingSmallDisabledAction());
            return new NotificationsGetUserSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  getTeamNf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_GET_TEAM_REQUEST),
      exhaustMap((action: TeamNotificationsGetRequest) => {
        return this.notificaService.getTeamNotifications(action.payload).pipe(
          map((response) => {
            return new TeamNotificationsGetSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  deleteNofitications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_DELETE_REQUEST),
      exhaustMap((action: DeleteNotificationsRequest) => {
        return this.notificaService.deleteNotifications(action.payload).pipe(
          map((response) => {
            return new DeleteNotificationsSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  requestInviteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_TEAM_REQUEST),
      exhaustMap((action: InviteTeamNotificationsRequest) => {
        return this.notificaService.requestInviteTeam(action.payload).pipe(
          map((response) => {
            this.Alerts.success('Solicitação enviada com sucesso', 'Feito');
            return new InviteTeamNotificationsSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  inviteRequestUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_INVITE_USER_REQUEST),
      exhaustMap((action: InviteUserNotificationsRequest) => {
        return this.notificaService.requestInviteUser(action.payload).pipe(
          map((response) => {
            this.Alerts.success('Solicitação enviada com sucesso', 'Feito');
            return new InviteUserNotificationsSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  updateQuestionTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_QUESTION_TEAM_REQUEST),
      exhaustMap((action: QuestionTeamNotificationsRequest) => {
        return this.notificaService.UpdateQuestionTeam(action.payload).pipe(
          map((response) => {
            return new QuestionTeamNotificationsSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationGlobalError(error));
          })
        );
      })
    )
  );

  acepptInvite$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotificationsEnum.LOAD_NOTIFICATIONS_ACCEPT_INVITE_REQUEST),
      exhaustMap((action: AcceptInviteNotificationsRequest) => {
        return this.notificaService.acceptInviteNotifications(action.payload).pipe(
          map((response) => {

            if(action.payload?.type == 'user'){
              this.store.dispatch(new AcceptInviteNotificationsTeamUserReducer(action.payload));
            }
            this.Alerts.success('Agora voce faz parte do time ;)', 'Booa');
            return new AcceptInviteNotificationsSucess(response);
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new NotificationGlobalError(error));
          })
        )
      })
    )
  );
  recuseInvite$ = createEffect(() => 
  this.actions$.pipe(
    ofType(NotificationsEnum.LOAD_NOTIFICATIONS_RECUSE_INVITE_REQUEST),
    exhaustMap((action: RecuseInviteNotificationsRequest) => {
      return this.notificaService.recuseInviteNotifications(action.payload).pipe(
        map((response) => {
          
          return new RecuseInviteNotificationsSuccess(response);
        }),
        catchError((error) => {
          const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
          return of(new NotificationGlobalError(error));
        })
      )
    })
  )
);

  constructor(
    private actions$: Actions,
    private notificaService: NotificationsService,
    private router: Router,
    private store: Store,
    private Alerts: AlertService
  ) {}
}
