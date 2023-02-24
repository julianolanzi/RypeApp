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

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private Alerts: AlertService
  ) {}
}
