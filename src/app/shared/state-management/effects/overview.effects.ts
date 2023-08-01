import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { AlertService } from "src/app/services/utils/alert.service";
import { GlobalState } from "../states/global.state";
import { OverviewMessageEnum } from "../actions/overview/overview-message.enum";

import { exhaustMap, catchError, map, of } from 'rxjs';
import { OpPlayerIdRequestAction } from "../actions/overview/user/search-player/op-load-player-id-request.action";
import { OverviewService } from "src/app/services/overview/overview.service";
import { OpGlobalErrorAction } from "../actions/overview/op-load-global-error.actions";
import { OpPlayerTimelineRequestAction } from "../actions/overview/user/load-timeline/op-load-timeline-request-actions";
import { OpPlayerTimelineSuccessAction } from "../actions/overview/user/load-timeline/op-load-timeline-success-actions";
import { LoadingSmallDisabledAction } from "../actions/global-pages/global-loading-small/loading-small-disabled.actions";
import { OpPlayerIdSuccessAction } from "../actions/overview/user/search-player/op-load-player-id-success.action";
import { OpTeamIdRequestAction } from "../actions/overview/team/load-info-team/op-load-team-id-request.action";
import { LoadingDisabledAction } from "../actions/global-pages/loading-load-disabled.actions";
import { OpTeamIdSuccessAction } from "../actions/overview/team/load-info-team/op-load-team-id-success.action";
@Injectable({
    providedIn: 'root',
})

export class OverviewEffect {
    loadPLayerId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OverviewMessageEnum.LOAD_PLAYER_ID_REQUEST),
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
            ofType(OverviewMessageEnum.LOAD_PLAYER_TIMELINE_REQUEST),
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

    getInfoTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OverviewMessageEnum.LOAD_TEAM_ID_REQUEST),
      exhaustMap((action: OpTeamIdRequestAction) => {
        return this.OPService.getById(action.payload).pipe(
          map((response) => {
            this.store.dispatch(new LoadingSmallDisabledAction());
            return new OpTeamIdSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new OpGlobalErrorAction(error));
          })
        );
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