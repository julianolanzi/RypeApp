import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/models/auth/user-login';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  userLogin!: UserLogin;

  errors: any[] = [];

  isLoginSucess: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoading = false;
    this.isLoginSucess = false;
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

  Login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userLogin = Object.assign({}, this.userLogin, this.loginForm.value);
    this.isLoading = true;
    this.authService.loginUser(this.userLogin).subscribe(
      (sucesso) => {
        this.processarLoginSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );
  }

  processarLoginSucesso(response: any) {
    this.isLoading = false;
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
    this.isLoading = false;
    this.errors = fail.error.errors;
  }
}
