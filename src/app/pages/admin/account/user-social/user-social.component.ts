import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { UserUpdateRequest } from 'src/app/models/account/update-user/user-update-request';
import { AccountLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-overview/account-load-request.actions';
import { AccountUpdateLoadRequestAction } from 'src/app/shared/state-management/actions/account/account-update/account-update-load.actions';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss']
})
export class UserSocialComponent {
  updateForm!: FormGroup;
  updateSocialMedias!: FormGroup;
  loading$!: Observable<boolean>;

  userUpdate!: UserUpdateRequest;
  socialUpdate!: UserUpdateRequest;
  private subscriptions: Subscription = new Subscription();
  public user!: UserSuccessResponse;

  public id!: string;
  constructor(private store: Store<GlobalState>) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.updateSocialMedias = new FormGroup({
      discord: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      youtube: new FormControl(''),
      twitter: new FormControl(''),
      twitch: new FormControl(''),
      psn: new FormControl(''),
      xbox: new FormControl(''),
      idGame: new FormControl(''),
    })
  }

  updateMedias() {
    if (this.updateSocialMedias.invalid) {
      return;
    }
    this.userUpdate = this.user,
      this.socialUpdate = Object.assign({}, this.socialUpdate, this.updateSocialMedias.value);

    const data = {
      ...this.userUpdate,
      social: {
        ...this.socialUpdate,
      },
      id: this.id,
    };

    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadRequestAction(data));
  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.loadId();
    this.getUserId();
    this.loadUser();
  }
  getUserId() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountLoadRequestAction(this.id));
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
        this.updateSocialMedias.patchValue({
          discord: this.user.social?.discord,
          instagram: this.user.social?.instagram,
          facebook: this.user.social?.facebook,
          youtube: this.user.social?.youtube,
          twitter: this.user.social?.twitter,
          twitch: this.user.social?.twitch,
          psn: this.user.social?.psn,
          xbox: this.user.social?.xbox,
          idGame: this.user.social?.idGame,
        });

      });
    this.subscriptions.add(subscription);
  }
}
