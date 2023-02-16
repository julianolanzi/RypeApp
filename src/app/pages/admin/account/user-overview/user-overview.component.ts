import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { User } from './../../../../models/account/User';
import { UserService } from 'src/app/services/user/user.service';
import { UserUpdate } from './../../../../models/account/User-update';
@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent {
  updateForm!: FormGroup;
  errors: any[] = [];
  isLoading: boolean = false;
  isChangeSucess: boolean = false;
  localStorageUtils = new LocalStorageUtils();
  id: string = '';
  user!: User;
  userUpdate!: UserUpdate;

  constructor(
    private UserService: UserService,
    private datePipe: DatePipe
  ) {
    this.getUser();
    this.isLoading = true;
    this.isChangeSucess = true;
    this.updateForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      idGame: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      country: new FormControl(''),
      birthday: new FormControl(''),
      discord: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      youtube: new FormControl(''),
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  get nickname() {
    return this.updateForm.get('nickname')!;
  }
  get name() {
    return this.updateForm.get('name')!;
  }
  get lastname() {
    return this.updateForm.get('lastname')!;
  }
  get idGame() {
    return this.updateForm.get('idGame')!;
  }
  get phone() {
    return this.updateForm.get('phone')!;
  }
  get gender() {
    return this.updateForm.get('gender')!;
  }
  get country() {
    return this.updateForm.get('country')!;
  }
  get birthday() {
    return this.updateForm.get('birthday')!;
  }
  get discord() {
    return this.updateForm.get('discord')!;
  }
  get instagram() {
    return this.updateForm.get('instagram')!;
  }
  get facebook() {
    return this.updateForm.get('facebook')!;
  }
  get youtube() {
    return this.updateForm.get('youtube')!;
  }

  getUser() {
    this.id = this.UserLocalInfo();
    this.UserService.GetUser(this.id).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
        this.user = sucesso;

        this.updateForm.patchValue({
          nickname: this.user.nickname,
          name: this.user.name,
          lastname: this.user.lastname,
          gender: this.user.gender,
          birthday: this.datePipe.transform(
            this.user.birthday,
            'yyyy-MM-dd',
            'UTC'
          ),
          country: this.user.country,
          phone: this.user.phone,
        });
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );
  }

  updateProfile() {
    if (this.updateForm.invalid) {
      return;
    }

    this.userUpdate = Object.assign({}, this.userUpdate, this.updateForm.value);

    this.isLoading = true;

    this.UserService.updateUser(this.userUpdate, this.id).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );

  }

  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }
  processarSucesso(response: any) {
    this.isLoading = false;
    this.errors = [];
  }

  UserLocalInfo() {
    let user = this.localStorageUtils.obertUser();
    user = JSON.parse(user);
    this.id = user.id;
    return this.id;
  }
}
