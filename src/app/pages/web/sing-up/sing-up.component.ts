import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/auth/user-register';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {
  cadastroForm!: FormGroup;
  errors: any[] = [];
  User!: UserRegister;
  isRegisterSucess!: boolean;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {
    this.isLoading = false;
    this.isRegisterSucess = false;
    this.cadastroForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+55-?)|0)?[0-9]{11}$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/),
      ]),
      password: new FormControl('', [Validators.required]),
      url: new FormControl(''),
      terms: new FormControl('', [
        Validators.required,
        Validators.pattern('true'),
      ]),
    });
  }

  get nickname() {
    return this.cadastroForm.get('nickname')!;
  }
  get terms() {
    return this.cadastroForm.get('terms')!;
  }
  get phone() {
    return this.cadastroForm.get('phone')!;
  }
  get name() {
    return this.cadastroForm.get('name')!;
  }

  get birthday() {
    return this.cadastroForm.get('birthday')!;
  }
  get email() {
    return this.cadastroForm.get('email')!;
  }
  get password() {
    return this.cadastroForm.get('password')!;
  }

  addAcount() {
    if (this.cadastroForm.invalid) {
      return;
    }
    this.User = Object.assign({}, this.User, this.cadastroForm.value);

    let url = this.randomImg();
    this.User.url = url;

    this.isLoading = true;
    this.securityService.registrarUsuario(this.User).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );
  }
  processarSucesso(response: any) {
    this.isLoading = false;
    this.isRegisterSucess = true;
    this.errors = [];

    if (response != this.errors) {
    }
    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 2000);
  }
  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }

  randomImg() {
    let number = Math.floor(Math.random() * 10 + 1);
    const path = 'https://rype-app.vercel.app';
    var img = '';

    switch (number) {
      case 1:
        img = 'assets/img/avatars/male/1.jpg';
        break;
      case 2:
        img = 'assets/img/avatars/male/2.jpg';
        break;
      case 3:
        img = 'assets/img/avatars/male/3.jpg';
        break;
      case 4:
        img = 'assets/img/avatars/male/4.jpg';
        break;
      case 5:
        img = 'assets/img/avatars/male/5.jpg';
        break;
      case 6:
        img = 'assets/img/avatars/female/1.jpg';
        break;
      case 7:
        img = 'assets/img/avatars/female/2.jpg';
        break;
      case 8:
        img = 'assets/img/avatars/female/3.jpg';
        break;
      case 9:
        img = 'assets/img/avatars/female/4.jpg';
        break;
      case 10:
        img = 'assets/img/avatars/female/5.jpg';
        break;
      default:
        console.log('imagem sem carregamento');
    }

    let url = path + '/' + img;
    return url;
  }
}
