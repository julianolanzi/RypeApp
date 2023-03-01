import { catchError, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Store } from '@ngrx/store';
import { UpdateImg } from 'src/app/models/account/user-update-img';
import { UpdateImgTeam } from 'src/app/models/teams/team-update-img';

@Injectable({
  providedIn: 'root',
})
export class UploadImgService extends BaseService {
  constructor(private http: HttpClient, store: Store) {
    super(store);
  }

  uploadImgUser(img: UpdateImg): Observable<any> {
    const formData = new FormData();
    formData.append('file', img.file);

    let response = this.http
      .post(
        this.UrlServiceV1 + '/users/img/' + img.id,
        formData,
        this.ObterAuthHeaderUploadJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  uploadImgTeam(img: UpdateImgTeam): Observable<any> {
    const formData = new FormData();
    formData.append('file', img.file);

    let response = this.http
      .post(
        this.UrlServiceV1 + '/teams/img/' + img.id,
        formData,
        this.ObterAuthHeaderUploadJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
