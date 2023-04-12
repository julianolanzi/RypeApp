import { NotificationsGetUserSuccess } from './../actions/notifications/user-notifications/get-notifications/notifications-load-success.actions';
import { NotificationsGetUserError } from './../actions/notifications/user-notifications/get-notifications/notifications-load-error.actions';
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
import { TeamNotificationsGetError } from '../actions/notifications/team-notifications/get-notifications/notifications-team-load-error.actions';
import { DeleteNotificationsError } from '../actions/notifications/delete-notifications/notifications-delete-load-error.actions';
import { DeleteNotificationsSuccess } from '../actions/notifications/delete-notifications/notifications-delete-load-success.actions';
import { DeleteNotificationsRequest } from '../actions/notifications/delete-notifications/notifications-delete-load-request.actions';
import { InviteTeamNotificationsRequest } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { InviteTeamNotificationsSuccess } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-success.actions';
import { InviteTeamNotificationsError } from '../actions/notifications/team-notifications/request-invite-team/notifications-team-invite-error.actions';

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
            return new NotificationsGetUserSuccess(response);
          }),
          catchError((error) => {
            return of(new NotificationsGetUserError(error));
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
            return of(new TeamNotificationsGetError(error));
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
            return of(new DeleteNotificationsError(error));
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
          return of(new InviteTeamNotificationsError(error));
        })
      )
    })
  )
  )

  constructor(
    private actions$: Actions,
    private notificaService: NotificationsService,
    private router: Router,
    private store: Store,
    private Alerts: AlertService
  ) {}
}
