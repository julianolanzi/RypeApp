import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserChangePass } from 'src/app/models/account/user-change-pass';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/utils/alert.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss'],
})
export class UserSecurityComponent {
  updatePass!: FormGroup;
  localStorageUtils = new LocalStorageUtils();
  user!: UserChangePass;
  errors: any[] = [];
  data!: any;
  isLoading: boolean = false;

  constructor(
    private UserService: UserService,
    private Alerts: AlertService,
    private router: Router
  ) {
    this.updatePass = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }

  get password() {
    return this.updatePass.get('password')!;
  }
  get newpassword() {
    return this.updatePass.get('newpassword')!;
  }
  get confirmpassword() {
    return this.updatePass.get('confirmpassword')!;
  }

  updatePassWord() {
    if (this.updatePass.invalid) {
      return;
    }
    this.isLoading = true;
    let localData = this.UserLocalInfo();

    this.data = Object.assign({}, this.user, this.updatePass.value);

    this.user = {
      password: this.data.password,
      newpassword: this.data.newpassword,
      confirmpassword: this.data.confirmpassword,
      email: localData.email,
    };

    this.UserService.chagePassword(this.data, localData.id).subscribe(
      (sucesso) => {
        this.Alerts.sucess('Senha alterada com sucesso, iremos te redirecionar para o login.', 'Tudo certo 😉');
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.Alerts.error(falha.error.error, 'Ops, Aconteceu um erro 🥺');
        this.processarFalha(falha);
      }
    );
  }

  processarSucesso(response: any) {
    this.isLoading = false;
    this.errors = [];

    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 4000);
  }

  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }

  UserLocalInfo() {
    let user = this.localStorageUtils.obertUser();
    user = JSON.parse(user);
    let localData = {
      email: user.email,
      id: user.id,
    };
    return localData;
  }
}
