import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { AlertService } from "src/app/services/utils/alert.service";
import { GlobalState } from "../states/global.state";
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';
import { GlobalMessageEnum } from "../actions/global-pages/global-pages-message.enum";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UploadImageCoverRequestAction } from "../actions/global-pages/upload-images-cover/loading-upload-cover-request.actions";
import { GlobalErrorAction } from "../actions/global-pages/global-load-error.action";
import { UploadImageSuccessAction } from "../actions/global-pages/upload-images-cover/loading-upload-cover-success.actions";

@Injectable({
    providedIn: 'root',
})


export class GlobalEffect {


    uploadImgCover$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GlobalMessageEnum.UPDATE_IMG_COVER_REQUEST),
            exhaustMap((action: UploadImageCoverRequestAction) => {
                return this.ImageService.uploadImgCover(action.payload).pipe(
                    map((response) => {
                        this.Alerts.success('Atualizada com sucesso', 'Foto de Capa');
                        return new UploadImageSuccessAction(response);

                    }),
                    catchError((error) => {
                        const err = error.error.error;
                        this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
                        return of(new GlobalErrorAction(error));
                    })
                );
            })
        )
    )


    constructor(
        private actions$: Actions,
        private Alerts: AlertService,
        private store: Store,
        private state: State<GlobalState>,
        private ImageService: UploadImgService
    ) { }
}