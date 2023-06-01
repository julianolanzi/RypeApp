import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { AccountUpdateLoadImgRequestAction } from 'src/app/shared/state-management/actions/account/account-img/account-update-load-img-request.actions';


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

import { UserSuccessResponse } from 'src/app/models/account/user-success-response';
import { UserUpdateRequest } from 'src/app/models/account/user-update-request';
import { AccountLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-overview/account-load-request.actions';
import { AccountUpdateLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-update/account-update-load.actions';




@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent {
 
  updateForm!: FormGroup;
  public id!: string;
  private subscriptions: Subscription = new Subscription();
  public user!: UserSuccessResponse;
  userUpdate!: UserUpdateRequest;
  url: any;
  file!: File;
  updateImg!: UpdateImg;
  loading$!: Observable<boolean>;

  constructor(private datePipe: DatePipe, private store: Store<GlobalState>) {
  
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
      .subscribe((user) => 
        this.user = user
     
        
      );

    this.subscriptions.add(subscription);
  }

  // ngOnDestroy(): void {

  //   this.store.dispatch(new AccountResetLoadAction());
  // }
}
