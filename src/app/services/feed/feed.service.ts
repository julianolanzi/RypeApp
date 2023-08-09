import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Store } from '@ngrx/store';

import { BaseService } from "../base.service";
import { PostCreateSuccess } from "src/app/models/feed/create-post/post-create-sucess";
import { Observable, catchError, map } from "rxjs";
import { TimelineRequest } from "src/app/models/feed/timeline/timeline-request";
import { ReactRequest } from "src/app/models/feed/reacts/react-request";
import { EditPostRequest } from "src/app/models/feed/edit-post/edit-post-request";
import { LoadCommentsSuccess } from "src/app/models/feed/comments/comments-load-success";
import { CreateComment } from "src/app/models/feed/comments/comments-create";
import { DeleteComment } from "src/app/models/feed/comments/comments-delete";
import { PostCreateRequest } from "src/app/models/feed/create-post/post-create-request";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";
import { PostCreateImageRequest } from "src/app/models/feed/create-post/post-create-request-image";


@Injectable()
export class FeedService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }
  createPost(data: PostCreateRequest | undefined): Observable<PostCreateSuccess> {
    let response = this.http
      .post(this.UrlFeed + '/posts/create/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  createPostWithImage(data: PostCreateImageRequest): Observable<any> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('text', data.text);
    formData.append('type', data.type);
    
    let response = this.http
      .post(
        this.UrlImgUpload + '/posts/post/',
        formData,
        this.ObterAuthHeaderUploadJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
  deletePostWithImagem(id: string | undefined): Observable<any> {
    const data = {
      imageName: id,
    }
    let response = this.http
      .put(this.UrlImgUpload + '/posts/post/delete/', data, this.ObterAuthHeaderJson())
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
  

  updatePost(data: EditPostRequest | undefined): Observable<any> {
    let response = this.http
      .put(this.UrlFeed + '/posts/update/' + data?.id, data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  loadCommentsByPost(id: string | undefined): Observable<LoadCommentsSuccess> {
    let response = this.http
      .get(this.UrlFeed + '/comments/searchByPost/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  createComment(data: CreateComment | undefined): Observable<LoadCommentsSuccess> {
    let response = this.http
      .post(this.UrlFeed + '/comments/create/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  deleteComment(data: DeleteComment | undefined): Observable<LoadCommentsSuccess> {
    let response = this.http
      .put(this.UrlFeed + '/comments/delete/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}