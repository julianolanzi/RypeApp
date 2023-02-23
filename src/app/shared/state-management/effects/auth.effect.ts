import { LoadAuthSuccessAction } from './../actions/auth/auth-load-success.actions';
import { LoadAuthErrorAction } from './../actions/auth/auth-load-error.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthMessageEnum } from '../actions/auth/auth-message.enum';
import { switchMap, catchError, map, of } from 'rxjs';
import { LoadAuthRequestAction } from '../actions/auth/auth-load-request.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  loginAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthMessageEnum.LOAD_AUTH_REQUEST),
      switchMap((action: LoadAuthRequestAction) => {
        return this.AuthService.loginUser(action.payload).pipe(
          map((response) => {
            if (!response) {
              return new LoadAuthErrorAction();
            } else {
              this.router.navigate(['dashboard']);
              return new LoadAuthSuccessAction(response);
            }
          }),
          catchError((error) => {
            return of(new LoadAuthErrorAction(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router
  ) {}
}
