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
import { LoadingDisabledAction } from "../actions/global-pages/loading-load-disabled.actions";
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
                    this.store.dispatch(new LoadingDisabledAction());
                    return new OpPlayerIdSuccessAction(response);
                  }),
                  catchError((error) => {
                    this.store.dispatch(new LoadingDisabledAction());
                    return of(new OpGlobalErrorAction(error));
                  })
            )
        })
    )
    );
    constructor(
        private actions$: Actions,
        private OPService: OverviewService,
        private Alerts: AlertService,
        private store: Store,
        private state: State<GlobalState>
    ) {

    }
}