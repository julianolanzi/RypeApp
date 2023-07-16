import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseService } from '../base.service';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { TeamNotificationsSuccess } from 'src/app/models/notifications/notifications-team-success';
import { RequestTeam } from 'src/app/models/notifications/notifications-request-team';
import { RequestInviteUser } from 'src/app/models/notifications/notifications-request-invite-user';
import { RequestQuestionTeam } from 'src/app/models/notifications/notifications-request-question-team';

@Injectable()
export class NotificationsService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  getUserNotifications(id: string | undefined): Observable<UserNotificationsSuccess> {

    let response = this.http
      .get(
        this.UrlNotifications + '/notifications/user/getUser/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getTeamNotifications(id: string | undefined): Observable<TeamNotificationsSuccess> {

    let response = this.http
      .get(
        this.UrlNotifications + '/notifications/team/getTeam/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  deleteNotifications(id: string | undefined): Observable<any> {
    let response = this.http
    .delete(this.UrlNotifications + '/notifications/delete/' + id, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  requestInviteTeam(data: RequestTeam | undefined): Observable<any>{
    let response = this.http
    .post(this.UrlNotifications + '/notifications/team/requestTeamUser',  data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  requestInviteUser(data: RequestInviteUser | undefined): Observable<any>{
    let response = this.http
    .post(this.UrlNotifications + '/notifications/user/inviteTeamUser',  data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  UpdateQuestionTeam(data: RequestQuestionTeam | undefined): Observable<any>{
    let response = this.http
    .post(this.UrlNotifications + '/notifications/userInvite',  data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  acceptInviteNotifications(data: UserNotificationsSuccess | undefined):Observable<string>{
    let response = this.http
    .put(this.UrlNotifications + '/notifications/acceptInvite', data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
  recuseInviteNotifications(data: UserNotificationsSuccess | undefined):Observable<string>{
    let response = this.http
    .put(this.UrlNotifications + '/notifications/recuseInvite', data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
