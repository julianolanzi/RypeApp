import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';
import { url } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent {
  ImageProfile$!: Observable<string>;
  public user!: UserSuccessResponse;
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>,private Router: Router) { 
    this.ImageProfile$ = this.store.pipe(select(url));


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

  uploadImageUser() {
    this.Router.navigate(['upload-image-user']);
  }
  uploadCoverUser() {
    this.Router.navigate(['upload-cover-user']);
  }
  routeProfile(){
    this.Router.navigate(['profile']);
  }
}
