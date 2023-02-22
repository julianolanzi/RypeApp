import { User } from './../../models/account/User';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AdminState } from 'src/app/shared/statement/admin/admin.state';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import * as AuthSelectors from '../../shared/statement/admin/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  localStorageUtils = new LocalStorageUtils();
  user$: Observable<any> = this.store.select(AuthSelectors.getUserInStore);
  

  constructor(private store: Store<AdminState>,){
    // this.UserLocalInfo();



  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.user$);
  }


  // UserLocalInfo() {
  //   let user = this.localStorageUtils.obertUser();
  //   user = JSON.parse(user);
  //   let localData = {
  //     nickname: user.nickname,
  //     url: user.url,
  //   };
  //   this.user = localData;
  //   return this.user;
  // }

}
