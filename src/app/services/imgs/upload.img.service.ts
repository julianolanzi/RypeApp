import { catchError, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Store } from '@ngrx/store';
import { UserUpdateImgRequest } from 'src/app/models/account/update-img/user-update-img-request';
import { UpdateImgTeamRequest } from 'src/app/models/teams/team-update-img/team-update-img-request';

@Injectable({
  providedIn: 'root',
})
export class UploadImgService extends BaseService {
  constructor(private http: HttpClient, store: Store) {
    super(store);
  }

  uploadImgUser(img: UserUpdateImgRequest): Observable<any> {
    const formData = new FormData();
    formData.append('file', img.file);

    let response = this.http
      .post(
        this.UrlImgUpload + '/users/img/' + img.id,
        formData,
        this.ObterAuthHeaderUploadJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  uploadImgTeam(img: UpdateImgTeamRequest): Observable<any> {
    const formData = new FormData();
    formData.append('file', img.file);

    let response = this.http
      .post(
        this.UrlImgUpload + '/teams/img/' + img.id,
        formData,
        this.ObterAuthHeaderUploadJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
