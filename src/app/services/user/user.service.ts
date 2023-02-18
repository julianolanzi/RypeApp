import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { BaseService } from '../base.service';
import { User } from './../../models/account/User';
import { UserUpdate } from './../../models/account//User-update';
import { UserChangePass } from 'src/app/models/account/user-change-pass';

@Injectable()
export class UserService extends BaseService {
  localStorageUtils = new LocalStorageUtils();

  constructor(private http: HttpClient) {
    super();
  }

  GetUser(id: string): Observable<User> {
    let response = this.http
      .get(this.UrlServiceV1 + '/users/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  updateUser(user: UserUpdate, id: string): Observable<UserUpdate> {
    let response = this.http
      .put(this.UrlServiceV1 + '/users/' + id, user, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  chagePassword(user: UserChangePass, id: string): Observable<any> {
    let response = this.http
      .put(
        this.UrlServiceV1 + '/users/updatepass/' + id,
        user,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
