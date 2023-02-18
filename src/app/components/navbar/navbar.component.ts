import { Component } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  localStorageUtils = new LocalStorageUtils();

  user!: any;

  constructor(){
    this.UserLocalInfo();
  }


  UserLocalInfo() {
    let user = this.localStorageUtils.obertUser();
    user = JSON.parse(user);
    let localData = {
      nickname: user.nickname,
      url: user.url,
    };
    this.user = localData;
    return this.user;
  }

}
