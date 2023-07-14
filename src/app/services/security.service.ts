import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { BaseService } from './base.service';
import { RecoveryPasswordRequest } from '../models/auth/recovery-password/recovery-password-request';
import { ResetPassword } from '../models/auth/reset-pass/reset-password-request';
import { UserRegisterRequest } from '../models/auth/register/user-register-request';


@Injectable()
export class SecurityService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  recoveryPassword(email: RecoveryPasswordRequest): Observable<any> {
    let response = this.http
      .post(
        this.UrlAuth + '/auth/forgot_password',
        email,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  resetPassword(user: ResetPassword, token: string): Observable<any> {
    let response = this.http
      .post(
        this.UrlAuth + '/auth/reset_password/' + token,
        user,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  registrarUsuario(usuario: UserRegisterRequest): Observable<UserRegisterRequest> {
    let response = this.http
      .post(this.UrluserTeam + '/users/', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
