import { AuthState } from './../../shared/state-management/admin/auth/auth.reducer';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { Observable } from 'rxjs';
import { GlobalState } from './../../shared/state-management/states/global.state';

import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { State, Store } from '@ngrx/store';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // localStorageUtils = new LocalStorageUtils();
  // public userAuthResponse!: any;
  // user$!: UserLoginSuccess;
  

  // user$ : Observable<UserLoginSuccess> = this.store.select(AuthSelector);
  constructor(private state: State<GlobalState>, private store: Store<GlobalState>) {}

  ngOnInit(): void {
    // this.user$ = this.state.value.auth.auth;
    // console.log(this.user$);
  }

  // private GetUserInfo():void {
  //   const subscription = this.store.pipe(select(AuthSelector))
  //   .subscribe((userAuthResponse) => {

  //   })
  // }
}
