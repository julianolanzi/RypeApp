import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base.service';
import { UserChangePass } from 'src/app/models/account/user-change-pass';
import { UserSuccessResponse } from 'src/app/models/account/user-success-response';
import { UserUpdateRequest } from 'src/app/models/account/user-update-request';




@Injectable()
export class UserService extends BaseService {

  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  GetUser(id: string | undefined): Observable<UserSuccessResponse> {
    let response = this.http
      .get(this.UrlServiceV1 + '/users/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  updateUser(user: UserUpdateRequest): Observable<UserSuccessResponse> {
    let response = this.http
      .put(this.UrlServiceV1 + '/users/' + user.id,  user, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  chagePassword(updatePass: UserChangePass | undefined): Observable<any> {
    let response = this.http
      .put(
        this.UrlServiceV1 + '/users/updatepass/' + updatePass?.id,
        updatePass,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
