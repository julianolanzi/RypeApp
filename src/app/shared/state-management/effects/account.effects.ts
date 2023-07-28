import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, exhaustMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/utils/alert.service';
import { UploadImgService } from 'src/app/services/imgs/upload.img.service';

import { AccountMessageEnum } from '../actions/account/account-message.enum';

import { AccountUpdateLoadImgRequestAction } from '../actions/account/account-img/account-update-load-img-request.actions';
import { AccountUpdateLoadImgSuccessAction } from '../actions/account/account-img/account-update-load-img-success.actions';

import { AccountUpdateLoadSuccessAction } from '../actions/account/account-update/account-update-load-success.actions';
import { AccountUpdatePassLoadRequestAction } from '../actions/account/account-reset-password/account-update-pass-request-actions';

import { AccountLoadRequestAction } from '../actions/account/account-overview/account-load-request.actions';
import { AccountLoadSuccessAction } from '../actions/account/account-overview/account-load-success.actions';

import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';

import { AccountUpdateLoadRequestAction } from '../actions/account/account-update/account-update-load.actions';
import { AccountUpdatePassLoadSuccessAction } from '../actions/account/account-reset-password/account-update-pass-success-actions';

import { AccountLoadGlobalErrorAction } from '../actions/account/account-global-error.actions';

@Injectable({
  providedIn: 'root',
})
export class AccountEffect {
  loadadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT),

      exhaustMap((action: AccountLoadRequestAction) => {
        return this.userService.GetUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountLoadGlobalErrorAction();
            } else {
              this.store.dispatch(new LoadingDisabledAction());
              return new AccountLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_REQUEST),
      exhaustMap((action: AccountUpdateLoadRequestAction) => {
        return this.userService.updateUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountLoadGlobalErrorAction();
            } else {
              this.store.dispatch(new LoadingDisabledAction());
              this.Alerts.success('com sucesso', 'Perfil atualizado');
              return new AccountUpdateLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  updateImg$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_IMG_REQUEST),
      exhaustMap((action: AccountUpdateLoadImgRequestAction) => {
        return this.imgService.uploadImgUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountLoadGlobalErrorAction(response);
            } else {
              this.store.dispatch(new LoadingDisabledAction());

              setTimeout(() => {
                this.Router.navigate(['/profile']);
              }, 2000);
              this.Alerts.success('Imagem atualizada com sucesso', 'Boa');
              return new AccountUpdateLoadImgSuccessAction(response);
            }
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  updatePass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountMessageEnum.LOAD_ACCOUNT_UPDATE_PASSWORD_REQUEST),
      exhaustMap((action: AccountUpdatePassLoadRequestAction) => {
        return this.userService.chagePassword(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new AccountLoadGlobalErrorAction();
            } else {
              this.store.dispatch(new LoadingDisabledAction());
              this.Alerts.success(
                'Nova senha será exigida no seu próximo login',
                'Senha alterada com sucesso'
              );
              return new AccountUpdatePassLoadSuccessAction(response);
            }
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());
            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new AccountLoadGlobalErrorAction(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store,
    private Alerts: AlertService,
    private imgService: UploadImgService,
    private Router: Router,
  ) {}
}
