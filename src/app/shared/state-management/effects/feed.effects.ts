import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { AlertService } from "src/app/services/utils/alert.service";
import { FeedPostCreateRequestAction } from "../actions/feed/feed-post/feed-create-post-request.actions";
import { FeedMessageEnum } from "../actions/feed/feed-message.enum";
import { FeedService } from "src/app/services/feed/feed.service";
import { LoadingDisabledAction } from "../actions/global-pages/loading-load-disabled.actions";
import { catchError, map, of, exhaustMap } from 'rxjs';
import { FeedLoadGlobalErrorAction } from "../actions/feed/feed-global-error.actions";
import { FeedPostCreateSuccessAction } from "../actions/feed/feed-post/feed-create-post-success.actions";
import { FeedTimelineRequestAction } from "../actions/feed/feed-timelime/feed-load-timeline-request.actions";
import { LoadingSmallDisabledAction } from "../actions/global-pages/global-loading-small/loading-small-disabled.actions";
import { FeedTimelineSuccessAction } from "../actions/feed/feed-timelime/feed-load-timeline-success.actions";
import { FeedReactRequestAction } from "../actions/feed/react-post/feed-load-react-request.actions";
import { FeedReactSucessAction } from "../actions/feed/react-post/feed-load-react-success.actions";
import { GlobalState } from "../states/global.state";
import { FeedDeletePostRequestAction } from "../actions/feed/delete-post/feed-load-delete-post-request.actions";
import { FeedDeletePostSuccessAction } from "../actions/feed/delete-post/feed-load-delete-post-success.actions";
import { FeedPostEditRequestAction } from "../actions/feed/edit-post/feed-edit-post-request.actions";
import { FeedPostEditSuccessAction } from "../actions/feed/edit-post/feed-edit-post-success.actions";
import { PostCommentsLoadRequestAction } from "../actions/feed/comments-load/feed-load-comments-post-request.actions";
import { PostCommentsLoadSuccessAction } from "../actions/feed/comments-load/feed-load-comments-post-success.actions";
import { PostCommentsCreateRequestAction } from "../actions/feed/comments-create/load-create-comment-request.actions";
import { PostCommentsCreateSuccessAction } from "../actions/feed/comments-create/load-create-comment-success.actions";
import { PostCommentsDeleteRequestAction } from "../actions/feed/comments-delete/load-delete-comment-request.actions";
import { PostCommentsDeleteSuccessAction } from "../actions/feed/comments-delete/load-delete-comment-success.actions";
import { FeedPostCreateImageRequestAction } from "../actions/feed/feed-post/feed-create-post-request-image.actions";
import { FeedDeletePostImgRequestAction } from "../actions/feed/delete-post/feed-load-delete-post-img-request.actions";
@Injectable({
    providedIn: 'root',
})

export class FeedEffect {

    createPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_POST_REQUEST),
            exhaustMap((action: FeedPostCreateRequestAction) => {
                return this.feedService.createPost(action.payload).pipe(
                    map((response) => {
                        this.Alerts.success('Post criado com sucesso', 'Booa');
                        this.store.dispatch(new LoadingDisabledAction());
                        return new FeedPostCreateSuccessAction(response);
                    }),
                    catchError((error) => {
                        this.store.dispatch(new LoadingDisabledAction());
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    createPostWithImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_POST_IMAGE_REQUEST),
            exhaustMap((action: FeedPostCreateImageRequestAction) => {
                return this.feedService.createPostWithImage(action.payload).pipe(
                    map((response) => {
                        this.Alerts.success('Post criado com sucesso', 'Booa');
                        this.store.dispatch(new LoadingDisabledAction());
                        return new FeedPostCreateSuccessAction(response);
                    }),
                    catchError((error) => {
                        this.store.dispatch(new LoadingDisabledAction());
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    loadTimeline$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_TIMELINE_REQUEST),
            exhaustMap((action: FeedTimelineRequestAction) => {
                return this.feedService.loadTimeline(action.payload).pipe(
                    map((response) => {

                        this.store.dispatch(new LoadingSmallDisabledAction());

                        return new FeedTimelineSuccessAction(response);
                    }),
                    catchError((error) => {
                        this.store.dispatch(new LoadingSmallDisabledAction());
                        const err = error.error.error;
                        if (err != undefined) {
                            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        } else {
                            this.Alerts.error('Estamos com uma problema de comunicação para exibir sua timeline e já estamos verificando, tente novamente em alguns minutos ', 'Ops tivemos um problema');
                        }

                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        ));

    reactPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_REACT_POST_REQUEST),
            exhaustMap((action: FeedReactRequestAction) => {
                return this.feedService.reactPost(action.payload).pipe(
                    map((response) => {

                        return new FeedReactSucessAction(response);
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    deletePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_DELETE_POST_REQUEST),
            exhaustMap((action: FeedDeletePostRequestAction) => {
                return this.feedService.deletePost(action.payload).pipe(
                    map((response) => {
                        return new FeedDeletePostSuccessAction(action.payload);
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    deletePostImg$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_DELETE_POST_IMAGE_REQUEST),
            exhaustMap((action: FeedDeletePostImgRequestAction) => {
                return this.feedService.deletePostWithImagem(action.payload).pipe(
                    map((response) => {

                        return new FeedDeletePostSuccessAction();
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    editPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_FEED_POST_EDIT_REQUEST),
            exhaustMap((action: FeedPostEditRequestAction) => {
                return this.feedService.updatePost(action.payload).pipe(
                    map((response) => {
                        return new FeedPostEditSuccessAction();
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    loadComentsByPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_COMMENTS_POST_REQUEST),
            exhaustMap((action: PostCommentsLoadRequestAction) => {
                return this.feedService.loadCommentsByPost(action.payload).pipe(
                    map((response) => {
                        this.store.dispatch(new LoadingSmallDisabledAction());
                        return new PostCommentsLoadSuccessAction(response);
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    createComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_CREATE_COMMENTS_POST_REQUEST),
            exhaustMap((action: PostCommentsCreateRequestAction) => {
                return this.feedService.createComment(action.payload).pipe(
                    map((response) => {

                        return new PostCommentsCreateSuccessAction(response);
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        ));
    deleteComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FeedMessageEnum.LOAD_DELETE_COMMENTS_POST_REQUEST),
            exhaustMap((action: PostCommentsDeleteRequestAction) => {
                return this.feedService.deleteComment(action.payload).pipe(
                    map((response) => {

                        return new PostCommentsDeleteSuccessAction(response);
                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new FeedLoadGlobalErrorAction(error));
                    })
                )
            })
        ))

    constructor(private actions$: Actions, private Alerts: AlertService, private store: Store, private feedService: FeedService, private state: State<GlobalState>) {

    }
}