import { LoadAuthRequestAction } from './../../../shared/state-management/actions/auth/auth-load-request.actions';
import { GlobalState } from './../../../shared/state-management/states/global.state';
import { AdminState } from '../../../shared/state-management/admin/admin.state';
import * as authActions from '../../../shared/state-management/admin/auth/auth.actions';

import * as AuthSelectors from '../../../shared/state-management/admin/auth/auth.selectors';

import { select, State, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/models/auth/user-login';
import { AuthService } from './../../../services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  private userLogin!: UserLogin;

  errors: any[] = [];

  isLoginSucess: boolean = false;
  loading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<GlobalState>,
    private state: State<GlobalState>,
    private actions$: Actions
  ) {
    this.handleStoreActions();
    this.loading$ = this.store.pipe(select(AuthSelectors.loading));
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  private handleStoreActions(): void {
    // Login success
    this.actions$
      .pipe(ofType(authActions.loginSuccess))
      .subscribe();


    // Login failure
    this.actions$
      .pipe(
        ofType(authActions.loginFailure),
        map((actions) => actions.error)
      )
      .subscribe((errorMessage) => {
        console.log(errorMessage);
        // Swal.fire('Algo deu errado!', errorMessage, 'error');
      });
  }

  Login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userLogin = Object.assign({}, this.userLogin, this.loginForm.value);
    // this.isLoading = true;
   
    const value = {
      email: this.userLogin.email,
      password: this.userLogin.password,
    }
    this.store.dispatch(new LoadAuthRequestAction(this.userLogin));
    // this.authService.loginUser(this.userLogin).subscribe(
    //   (sucesso) => {
    //     this.processarLoginSucesso(sucesso);
    //   },
    //   (falha) => {
    //     this.processarFalha(falha);
    //   }
    // );
  }

  processarLoginSucesso(response: any) {
    this.errors = [];
    this.isLoginSucess = true;
    this.authService.LocalStorage.salvarDadosLocaisUsuario(response);
    if (response != this.errors) {
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }
}
