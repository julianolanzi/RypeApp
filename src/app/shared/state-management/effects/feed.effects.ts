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
import { FeedState } from "../states/feeed.state";
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
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
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
                        // const data = this.state.value.feed.timeLine;

                        // let index = data.findIndex((element: any) => element.id == action.payload?.id);

                        // if(data[index].reacts.length == 0 ){

                        //     let NewData = {
                        //         id: data[index].id,
                        //         title: data[index].title,
                        //         text: data[index].text,
                        //         type: data[index].type,
                        //         reactUser: action.payload?.react,
                        //         reacts: [{
                        //             user: '64a85fbe3a97a',
                        //             reactDate: new Date(),
                        //             react: action.payload?.react,
                        //             id: '64a85fbe3a97a',
                        //         }],
                        //         ranked: [
                        //             {
                        //                 reackRank: action.payload?.react,
                        //                 qtd: 1,
                        //             },
                        //             {
                        //                 reackRank: data[index].ranked[1].reackRank,
                        //                 qtd: data[index].ranked[1].qtd
                        //             },
                        //             {
                        //                 reackRank: data[index].ranked[2].reackRank,
                        //                 qtd: data[index].ranked[2].qtd
                        //             },
                        //             {
                        //                 reackRank: data[index].ranked[3].reackRank,
                        //                 qtd: data[index].ranked[3].qtd
                        //             },
                        //             {
                        //                 reackRank: data[index].ranked[4].reackRank,
                        //                 qtd: data[index].ranked[4].qtd
                        //             },
                        //             {
                        //                 reackRank: data[index].ranked[5].reackRank,
                        //                 qtd: data[index].ranked[5].qtd
                        //             },
                                    
                        //         ],
                        //         enableEdit: data[index].enableEdit,
                        //         urlPost: data[index].urlPost,
                        //         urlVideo: data[index].urlVideo,
                        //         comments: [...data[index].comments],
                        //         createdAt: data[index].createdAt,
                        //         lastUpdate: data[index].lastUpdate,
                        //         author: {
                        //             nickname: data[index].author.nickname,
                        //             name: data[index].author.name,
                        //             url: data[index].author.url,
                        //         }
                        //     }
                        //     console.log(NewData);
                        // }

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

    constructor(private actions$: Actions, private Alerts: AlertService, private store: Store, private feedService: FeedService, private state: State<GlobalState>) {

    }
}