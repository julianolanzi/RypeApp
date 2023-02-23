import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { LocalStorageUtils } from '../utils/localstorage';
import { UserLogin } from '../models/auth/user-login';
import { UserLoginSuccess } from '../models/auth/user-login-success';

@Injectable()
export class AuthService extends BaseService {
  localStorageUtils = new LocalStorageUtils();
  constructor(private http: HttpClient) {
    super();
  }

  loginUser(loginUser: UserLogin | undefined): Observable<UserLoginSuccess> {
    let response = this.http
      .post(this.UrlServiceV1 + '/auth/', loginUser, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
