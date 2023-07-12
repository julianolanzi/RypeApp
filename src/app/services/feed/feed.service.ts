import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Store } from '@ngrx/store';

import { BaseService } from "../base.service";
import { PostRequest } from "src/app/models/feed/post";
import { PostCreateSuccess } from "src/app/models/feed/post-create-sucess";
import { Observable, catchError, map } from "rxjs";
import { TimelineRequest } from "src/app/models/feed/timeline-request";
import { TimelineSuccess } from "src/app/models/feed/timeline-success";
import { ReactRequest } from "src/app/models/feed/react-request";


@Injectable()
export class FeedService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }
  createPost(data: PostRequest | undefined): Observable<PostCreateSuccess> {
    let response = this.http
      .post(this.UrlFeed + '/posts/create/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  loadTimeline(data: TimelineRequest | undefined): Observable<TimelineSuccess> {
    let response = this.http
      .get(this.UrlFeed + '/posts/timeline/?limit=' + data?.limit + '&offset=' + data?.offset, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  reactPost(data: ReactRequest | undefined): Observable<TimelineSuccess> {
    let response = this.http
      .put(this.UrlFeed + '/posts/react/' + data?.id, data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  deletePost(id: string | undefined): Observable<TimelineSuccess> {
    let response = this.http
      .delete(this.UrlFeed + '/posts/delete/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}