import { ModalGenericComponent } from './../../../../shared/modal-generic/modal-generic.component';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { User } from './../../../../models/account/User';
import { UserService } from 'src/app/services/user/user.service';
import { UserUpdate } from './../../../../models/account/User-update';
import { UploadImgService } from './../../../../services/imgs/upload.img.service';
import { AlertService } from './../../../../services/utils/alert.service';
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

  url: any;
  file!: File;
  isChangeImg: boolean = false;
  isDisable: boolean = false;

  constructor(
    private UserService: UserService,
    private datePipe: DatePipe,
    private Alerts: AlertService,
    private router: Router,
    private UploadImgService: UploadImgService,
  ) {
    this.getUser();
    this.isLoading = true;
    this.isChangeSucess = true;
    this.isChangeImg = false;

    this.isDisable = true;

    this.updateForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      idGame: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      email: new FormControl({value: '', disabled: true}),
      country: new FormControl(''),
      birthday: new FormControl(''),
      discord: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      youtube: new FormControl(''),
      createdAt: new FormControl({value: '', disabled: true}),
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
  get email() {
    return this.updateForm.get('email')!;
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
        this.url = this.user.url;

        this.updateForm.patchValue({
          nickname: this.user.nickname,
          idGame: this.user.idGame,
          name: this.user.name,
          lastname: this.user.lastname,
          gender: this.user.gender,
          email: this.user.email,
          birthday: this.datePipe.transform(
            this.user.birthday,
            'yyyy-MM-dd',
            'UTC'
          ),
          country: this.user.country,
          phone: this.user.phone,
          youtube: this.user.youtube,
          discord: this.user.discord,
          instagram: this.user.instagram,
          facebook: this.user.facebook,
          createdAt: this.datePipe.transform(
            this.user.createdAt,
            'dd-MM-yyyy',
            'UTC',
          ),
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
        this.Alerts.sucess('Atualizado com sucesso', 'Perfil');
      },
      (falha) => {
        this.processarFalha(falha);
        this.Alerts.error(falha.error.error, 'Ops, Aconteceu um erro 🥺');
      }
    );
  }

  processarFalha(fail: any) {
    if (fail.status == 401) {
      this.router.navigate(['/auth']);
    }
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

  onselectFile(e: any) {
    if (e.target.files) {
      this.file = e.srcElement.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.isChangeImg = true;
      };
    }
  }

  changeImg() {
    this.id = this.UserLocalInfo();
    this.isLoading = true;
    

    this.UploadImgService.uploadImgUser(this.id, this.file).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
        this.user = sucesso;
        this.Alerts.sucess('Atualizada com sucesso', 'Foto de Perfil');
      },
      (falha) => {
        this.processarFalha(falha);
        this.Alerts.error(falha.error.error, 'Ops, Aconteceu um erro 🥺');
      }
    );
  }
}
