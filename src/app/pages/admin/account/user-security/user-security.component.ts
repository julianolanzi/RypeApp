import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserChangePassRequest } from 'src/app/models/account/change-password/user-change-password-request';

import { AccountUpdatePassLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-reset-password/account-update-pass-request-actions';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { LoadingDisabledAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-disabled.actions';

import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss'],
})
export class UserSecurityComponent {
  updatePass!: FormGroup;
  user!: UserChangePassRequest;
  loading$!: Observable<boolean>;
  data: any;
  id: string = '';
  email: string = '';
  private subscriptions: Subscription = new Subscription();


  constructor(private router: Router, private store: Store<GlobalState>) {
  
    this.updatePass = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });

    this.loading$ = this.store.pipe(select(isLoadingGlobal));

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


    this.data = Object.assign({}, this.user, this.updatePass.value);

    this.user = {
      email: this.email,
      password: this.data.password,
      newpassword: this.data.newpassword,
      confirmpassword: this.data.confirmpassword,
      id: this.id,
    }
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdatePassLoadRequestAction(this.user));
  }

  public loadId() {
   
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.id = user.id;
        this.email = user.email;
        this.store.dispatch(new LoadingDisabledAction());
      });

    this.subscriptions.add(subscription);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadingActiveAction());
    this.loadId();
  }

}
