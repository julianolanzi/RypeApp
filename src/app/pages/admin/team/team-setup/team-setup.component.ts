import { Component } from '@angular/core';

import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.scss'],
})
export class TeamSetupComponent {
  localStorageUtils = new LocalStorageUtils();
  user: string = '';

  constructor() {
    this.UserLocalInfo();
  }

  UserLocalInfo() {
    let user = this.localStorageUtils.obertUser();
    user = JSON.parse(user);
    this.user = user.nickname;
    return this.user;
  }
}
