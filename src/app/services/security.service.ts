import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';


import { BaseService } from './base.service';
import { LocalStorageUtils } from '../utils/localstorage';
import { RecoveryPassword } from './../models/auth/recovery-password';
import { ResetPassword } from '../models/auth/reset-password';
import { UserRegister } from '../models/auth/user-register';


@Injectable()
export class SecurityService extends BaseService {
  localStorageUtils = new LocalStorageUtils();
  constructor(private http: HttpClient) {
    super();
  }

  recoveryPassword(email: RecoveryPassword): Observable<any> {
    let response = this.http
      .post(
        this.UrlServiceV1 + '/auth/forgot_password',
        email,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  resetPassword(user: ResetPassword, token: string): Observable<any> {
    let response = this.http
      .post(
        this.UrlServiceV1 + '/auth/reset_password/' + token,
        user,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  registrarUsuario(usuario: UserRegister): Observable<UserRegister> {
    let response = this.http
      .post(this.UrlServiceV1 + '/users/', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
