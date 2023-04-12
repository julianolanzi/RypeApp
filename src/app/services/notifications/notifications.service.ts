import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseService } from '../base.service';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { TeamNotificationsSuccess } from 'src/app/models/notifications/notifications-team-success';
import { RequestTeam } from 'src/app/models/notifications/notifications-request-team';

@Injectable()
export class NotificationsService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  getUserNotifications(id: string | undefined): Observable<UserNotificationsSuccess> {

    let response = this.http
      .get(
        this.UrlServiceV1 + '/notifications/getUser/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getTeamNotifications(id: string | undefined): Observable<TeamNotificationsSuccess> {

    let response = this.http
      .get(
        this.UrlServiceV1 + '/notifications/getTeam/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  deleteNotifications(id: string | undefined): Observable<any> {
    let response = this.http
    .delete(this.UrlServiceV1 + '/notifications/delete/' + id, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  requestInviteTeam(data: RequestTeam | undefined): Observable<any>{
    let response = this.http
    .post(this.UrlServiceV1 + '/notifications/requestTeamUser',  data, this.ObterAuthHeaderJson())
    .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
