import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../../../../shared/statement/admin/auth/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.AuthService.loginUser(action.credentials).pipe(
          map((res: any) => AuthActions.loginSuccess(res)),
          catchError(error => of(AuthActions.loginFailure( error.error )))
          
        )
      )
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['dashboard']);
          console.log('navigation');
        })
      ),
    { dispatch: false }
  );
}
