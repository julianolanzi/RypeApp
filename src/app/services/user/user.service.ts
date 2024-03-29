import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base.service';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { UserUpdateRequest } from 'src/app/models/account/update-user/user-update-request';
import { UserChangePassRequest } from 'src/app/models/account/change-password/user-change-password-request';




@Injectable()
export class UserService extends BaseService {

  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  GetUser(id: string | undefined): Observable<UserSuccessResponse> {
    let response = this.http
      .get(this.UrluserTeam + '/users/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  updateUser(user: UserUpdateRequest): Observable<UserSuccessResponse> {
    let response = this.http
      .put(this.UrluserTeam + '/users/' + user.id,  user, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  chagePassword(updatePass: UserChangePassRequest | undefined): Observable<any> {
    let response = this.http
      .put(
        this.UrluserTeam + '/users/updatepass/' + updatePass?.id,
        updatePass,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  searchByUserKey(key: string | undefined): Observable<any>{
    let response = this.http
    .get(this.UrlNotifications + '/notifications/user/searchUser/' + key, this.ObterAuthHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    );
    return response;
  }
}
