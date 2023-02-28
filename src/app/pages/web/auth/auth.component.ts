import { LoadAuthRequestAction } from './../../../shared/state-management/actions/auth/auth-load-request.actions';
import { GlobalState } from './../../../shared/state-management/states/global.state';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserLogin } from 'src/app/models/auth/user-login';
import {
  isAuthenticated,
} from 'src/app/shared/state-management/selectors/auth.selector';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  private userLogin!: UserLogin;

  errors: any[] = [];

  loading$!: Observable<boolean>;

  isAuthenticated$!: Observable<boolean>;
  constructor(
    private store: Store<GlobalState>,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticated));
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  Login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userLogin = Object.assign({}, this.userLogin, this.loginForm.value);

    const value = {
      email: this.userLogin.email,
      password: this.userLogin.password,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new LoadAuthRequestAction(this.userLogin));
  }
}
