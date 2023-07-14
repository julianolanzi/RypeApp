import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';

import { UserLoginSuccess } from '../models/auth/login/user-login-success';
import { UserLogin } from '../models/auth/login/user-login';

@Injectable()
export class AuthService extends BaseService {
  constructor(private http: HttpClient, Store: Store ) {
    super(Store);
  }

  loginUser(loginUser: UserLogin | undefined): Observable<UserLoginSuccess> {
    let response = this.http
      .post(this.UrlAuth + '/auth/', loginUser, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
