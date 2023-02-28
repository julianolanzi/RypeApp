import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { AccountUpdateLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-update-load.actions';
import { AccountUpdateLoadImgRequestAction } from 'src/app/shared/state-management/actions/account/account-update-load-img-request.actions';


import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { select, Store } from '@ngrx/store';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';

import { Observable, Subscription } from 'rxjs';

import { UpdateImg } from 'src/app/models/account/user-update-img';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { AccountLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-load-request.actions';

import { User } from 'src/app/models/account/user';
import { UserUpdate } from 'src/app/models/account/user-update';




@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent {
  updateForm!: FormGroup;
  public id!: string;
  private subscriptions: Subscription = new Subscription();
  public user!: User;
  userUpdate!: UserUpdate;
  url: any;
  file!: File;
  test$!: Observable<User>;
  updateImg!: UpdateImg;
  loading$!: Observable<boolean>;

  constructor(private datePipe: DatePipe, private store: Store<GlobalState>) {
    this.updateForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      idGame: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      email: new FormControl({ value: '', disabled: true }),
      country: new FormControl(''),
      birthday: new FormControl(''),
      discord: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      youtube: new FormControl(''),
      createdAt: new FormControl({ value: '', disabled: true }),
    });
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

  getUserId() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountLoadRequestAction(this.id));
  }

  updateProfile() {
    if (this.updateForm.invalid) {
      return;
    }

    this.userUpdate = Object.assign({}, this.userUpdate, this.updateForm.value);
    const data = {
      ...this.userUpdate,
      id: this.id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadRequestAction(data));
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

  changeImg() {
    this.updateImg = {
      file: this.file,
      id: this.id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadImgRequestAction(this.updateImg));
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
      .subscribe((user) => {
        this.user = user;
        const { nickname, idGame } = this.user;
        (this.url = this.user.url),
          this.updateForm.patchValue({
            nickname,
            idGame,
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
              'UTC'
            ),
          });
      });

    this.subscriptions.add(subscription);
  }

  // ngOnDestroy(): void {

  //   this.store.dispatch(new AccountResetLoadAction());
  // }
}
