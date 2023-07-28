import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { AlertService } from "src/app/services/utils/alert.service";
import { GlobalState } from "../states/global.state";
import { OverviewPlayerMessageEnum } from "../actions/overview-player/overview-player-message.enum";

import { exhaustMap, catchError, map, of } from 'rxjs';
import { OpPlayerIdRequestAction } from "../actions/overview-player/search-player/op-load-player-id-request.action";
import { OverviewService } from "src/app/services/overview-player/overview-player.service";
import { OpPlayerIdSuccessAction } from "../actions/overview-player/search-player/op-load-player-id-success.action";
import { OpGlobalErrorAction } from "../actions/overview-player/op-load-global-error.actions";
import { OpPlayerTimelineRequestAction } from "../actions/overview-player/load-timeline/op-load-timeline-request-actions";
import { OpPlayerTimelineSuccessAction } from "../actions/overview-player/load-timeline/op-load-timeline-success-actions";
import { LoadingSmallDisabledAction } from "../actions/global-pages/global-loading-small/loading-small-disabled.actions";
@Injectable({
    providedIn: 'root',
})

export class OverviewPlayerEffect {
    loadPLayerId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OverviewPlayerMessageEnum.LOAD_PLAYER_ID_REQUEST),
            exhaustMap((action: OpPlayerIdRequestAction) => {
                return this.OPService.getOverviewPlayer(action.payload).pipe(
                    map((response) => {
                        this.store.dispatch(new LoadingSmallDisabledAction());
                        return new OpPlayerIdSuccessAction(response);
                    }),
                    catchError((error) => {
                        this.Alerts.error('tivemos um problema para carregar as informações do jogador, estamos verificando tente novamente mais tarde.', 'Ops!');   
                        return of(new OpGlobalErrorAction(error));
                    })
                )
            })
        )
    );

    loadTimeLine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OverviewPlayerMessageEnum.LOAD_PLAYER_TIMELINE_REQUEST),
            exhaustMap((action: OpPlayerTimelineRequestAction) => {
                return this.OPService.getTimelinePlayer(action.payload).pipe(
                    map((response) => {
                        this.store.dispatch(new LoadingSmallDisabledAction());
                        return new OpPlayerTimelineSuccessAction(response);
                    }),
                    catchError((error) => {
                        this.Alerts.error('tivemos um problema para carregar a timeline do jogador, estamos verificando tente novamente mais tarde.', 'Ops!');
                        return of(new OpGlobalErrorAction(error));
                    })
                )
            })
        )

    )

    constructor(
        private actions$: Actions,
        private OPService: OverviewService,
        private Alerts: AlertService,
        private store: Store,
        private state: State<GlobalState>
    ) {

    }
}