import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';
import { isUrlCoverUser, url } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
@Component({
  selector: 'app-user-upload-cover-profile',
  templateUrl: './user-upload-cover-profile.component.html',
  styleUrls: ['./user-upload-cover-profile.component.scss']
})
export class UserUploadCoverProfileComponent { 
  private subscriptions: Subscription = new Subscription();
  public user!: UserSuccessResponse;
  constructor(private store: Store<GlobalState>) { 
  }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AccountSelector))
      .subscribe((response) => {
        this.user = response;
 
      });
    this.subscriptions.add(subscription);
  }


  
}
