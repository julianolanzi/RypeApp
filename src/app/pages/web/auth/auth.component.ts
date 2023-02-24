import { LoadAuthRequestAction } from './../../../shared/state-management/actions/auth/auth-load-request.actions';
import { GlobalState } from './../../../shared/state-management/states/global.state';

import { State, Store, select } from '@ngrx/store';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserLogin } from 'src/app/models/auth/user-login';
import { Observable } from 'rxjs';
import { isAuthenticated, IsLoading } from 'src/app/shared/state-management/selectors/auth.selector';

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
    private state: State<GlobalState>
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

   this.loading$= this.store.pipe(select(IsLoading));
   this.isAuthenticated$ = this.store.pipe(select(isAuthenticated))

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   
  }

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
    // this.isLoading = true;

    const value = {
      email: this.userLogin.email,
      password: this.userLogin.password,
    };
    this.store.dispatch(new LoadAuthRequestAction(this.userLogin));
  }

  // processarLoginSucesso(response: any) {
  //   this.errors = [];
  //   this.isLoginSucess = true;
  //   this.authService.LocalStorage.salvarDadosLocaisUsuario(response);
  //   if (response != this.errors) {
  //     setTimeout(() => {
  //       this.router.navigate(['/dashboard']);
  //     }, 2000);
  //   }
  // }

  // processarFalha(fail: any) {
  //   this.errors = fail.error.errors;
  // }
}
