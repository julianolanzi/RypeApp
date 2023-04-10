import { LoadAuthSuccessAction } from './../actions/auth/auth-load-success.actions';
import { LoadAuthErrorAction } from './../actions/auth/auth-load-error.actions';
import { LoadAuthRequestAction } from '../actions/auth/auth-load-request.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthMessageEnum } from '../actions/auth/auth-message.enum';
import { switchMap, catchError, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { AlertService } from 'src/app/services/utils/alert.service';
import { LoadingDisabledAction } from '../actions/global-pages/loading-load-disabled.actions';
import { Store } from '@ngrx/store';
import { UpdateImgAccountAction } from '../actions/global-pages/global-load-update-img.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  loginAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthMessageEnum.LOAD_AUTH_REQUEST),
      // tap(() => this.store.dispatch(new LoadingActiveAction())),
      switchMap((action: LoadAuthRequestAction) => {
        return this.AuthService.loginUser(action.payload).pipe(
          map((response) => {
            setTimeout(() => {
              this.router.navigate(['dashboard']);
            }, 1000);

            this.store.dispatch(new UpdateImgAccountAction(response));
            this.store.dispatch(new LoadingDisabledAction());
            return new LoadAuthSuccessAction(response);
          }),
          catchError((error) => {
            this.store.dispatch(new LoadingDisabledAction());

            const err = error.error.error;
            this.Alerts.error(err, 'Ops alguma coisa nao deu certo');
            return of(new LoadAuthErrorAction(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router,
    private store: Store,
    private Alerts: AlertService
  ) {}
}
