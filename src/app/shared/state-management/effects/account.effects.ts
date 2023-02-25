import { AccountUpdateLoadSuccessAction } from './../actions/account/account-update-load-success.actions';
import { AccountUpdateLoadErrorAction } from './../actions/account/account-update-load-error.actions';
import { AccountUpdateLoadRequestAction } from './../actions/account/account-update-load.actions';
import { AccountLoadSuccessAction } from './../actions/account/account-load-success.actions';
import { AccountLoadErrorAction } from './../actions/account/account-load-error.actions';
import { AccountLoadRequestAction } from './../actions/account/account-load-request.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

import { AlertService } from 'src/app/services/utils/alert.service';
import { AccountMessageEnum } from '../actions/account/account-message.enum';
import { AccountUpdateLoadImgRequestAction } from '../actions/account/account-update-load-img-request.actions';
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';
import { AccountUpdateLoadImgErrorAction } from '../actions/account/account-update-load-img-error.actions';
import { AccountUpdateLoadImgSuccessAction } from '../actions/account/account-update-load-img-success.actions';
import { AccountUpdatePassLoadRequestAction } from '../actions/account/account-update-pass-request-actions';
import { AccountUpdatePassLoadErrorAction } from '../actions/account/account-update-pass-error-actions';
import { AccountUpdatePassLoadSuccessAction } from '../actions/account/account-update-pass-success-actions';

@Injectable({
  providedIn: 'root',
})
export class AccountEffect {
  loadadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT),
      switchMap((action: AccountLoadRequestAction) => {
        return this.userService.GetUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountLoadErrorAction();
            } else {
              return new AccountLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountLoadErrorAction(error));
          })
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_REQUEST),
      switchMap((action: AccountUpdateLoadRequestAction) => {
        return this.userService.updateUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountUpdateLoadErrorAction();
            } else {
              return new AccountUpdateLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountUpdateLoadErrorAction(error));
          })
        );
      })
    )
  );

  updateImg$ = createEffect(() => this.actions$.pipe(
    ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_IMG_REQUEST),
    switchMap((action: AccountUpdateLoadImgRequestAction) => {
      return this.imgService.uploadImgUser(action.payload).pipe(
        map((response) => {
          if(!response){
            return new AccountUpdateLoadImgErrorAction();
          }else{
            this.Alerts.sucess('Imagem atualizada com sucesso', 'Boa');
            return new AccountUpdateLoadImgSuccessAction(response);
          }
        }),
        catchError((error) => {
          const err = error.error.error;
          this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
          return of(new AccountUpdateLoadImgErrorAction(error));
        })
      )
    })
  ));

  updatePass$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_PASSWORD_REQUEST),
      switchMap((action: AccountUpdatePassLoadRequestAction) => {
        return this.userService.chagePassword(action.payload).pipe(
          map((response) => {
            if(!response){
              return new AccountUpdatePassLoadErrorAction();
            }else{
              this.Alerts.sucess('Nova senha será exigida no seu próximo login', 'Senha alterada com sucesso');
              return new AccountUpdatePassLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountUpdatePassLoadErrorAction(error));
          })
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private Alerts: AlertService,
    private imgService: UploadImgService,
  ) {}
}
