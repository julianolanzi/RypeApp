import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';



import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { AccountUpdateLoadImgRequestAction } from 'src/app/shared/state-management/actions/account/account-img/account-update-load-img-request.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { UserUpdateRequest } from 'src/app/models/account/update-user/user-update-request';
import { AccountLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-overview/account-load-request.actions';
import { AccountUpdateLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-update/account-update-load.actions';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal, url } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { UserUpdateImgRequest } from 'src/app/models/account/update-img/user-update-img-request';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  updateForm!: FormGroup;
  updateFormAdress!: FormGroup;
  private subscriptions: Subscription = new Subscription();
  public user!: UserSuccessResponse;
  userUpdate!: UserUpdateRequest;
  userAdress!: UserUpdateRequest;

  public id!: string;
  url: any;
  file!: File;

  ImageProfile$!: Observable<string>;
  updateImg!: UserUpdateImgRequest;
  loading$!: Observable<boolean>;

  constructor(private datePipe: DatePipe, private store: Store<GlobalState>) {
    this.ImageProfile$ = this.store.pipe(select(url));
    this.updateForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      email: new FormControl({ value: '', disabled: true }),
      country: new FormControl(''),
      birthday: new FormControl(''),
      idRype: new FormControl({ value: '', disabled: true }),
      createdAt: new FormControl({ value: '', disabled: true }),
    });

    this.updateFormAdress = new FormGroup({
      city: new FormControl(''),
      district: new FormControl(''),
      number: new FormControl(''),
      street1: new FormControl(''),
      street2: new FormControl(''),
      zipcode: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.loadId();
    this.getUserId();
    this.loadUser();
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
  get idRype() {
    return this.updateForm.get('idRype')!;
  }
  get phone() {
    return this.updateForm.get('phone')!;
  }
  get gender() {
    return this.updateForm.get('gender')!;
  }
  get birthday() {
    return this.updateForm.get('birthday')!;
  }

  getUserId() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountLoadRequestAction(this.id));
  }

  updateProfile() {
    if (this.updateForm.invalid) {
      return;
    }
    this.userUpdate = this.user,
      this.userUpdate = Object.assign({}, this.userUpdate, this.updateForm.value);
    const data = {
      ...this.userUpdate,
      id: this.id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadRequestAction(data));
  }
  updateInfoAdress() {
    if (this.updateFormAdress.invalid) {
      return;
    }
    this.userUpdate = this.user,
      this.userAdress = Object.assign({}, this.userAdress, this.updateFormAdress.value);

    const data = {
      ...this.userUpdate,
      address: {
        ...this.userAdress,
      },
      id: this.id,
    };

    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadRequestAction(data));
  }

  public loadId() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.id = user.id;
      });

    this.subscriptions.add(subscription);
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AccountSelector))
      .subscribe((response) => {
        this.user = response;
        const { nickname } = this.user;
        (this.url = this.user.url),
          this.updateForm.patchValue({
            nickname,
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
            idRype: this.user.idRype,
            createdAt: this.datePipe.transform(
              this.user.createdAt,
              'dd-MM-yyyy',
              'UTC'
            ),
          });

        this.updateFormAdress.patchValue({
          city: this.user.address?.city,
          district: this.user.address?.district,
          number: this.user.address?.number,
          street1: this.user.address?.street1,
          street2: this.user.address?.street2,
          zipcode: this.user.address?.zipcode,
        })
      });
    this.subscriptions.add(subscription);
  }

  changeImg() {
    this.updateImg = {
      file: this.file,
      id: this.id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadImgRequestAction(this.updateImg));
  }

  onselectFile(e: any) {
    if (e.target.files) {
      this.file = e.srcElement.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }


}
