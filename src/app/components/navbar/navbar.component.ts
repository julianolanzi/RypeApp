import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';

import { GlobalState } from './../../shared/state-management/states/global.state';

import { Component, OnInit } from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { Subscription, Observable } from 'rxjs';
import { url } from 'src/app/shared/state-management/selectors/global-pages.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  url$!: Observable<string>;
  constructor(private state: State<GlobalState>, private store: Store<GlobalState>) {}

  ngOnInit(): void {
    this.loadUser();
    this.url$ = this.store.pipe(select(url));
  }

  public loadUser(){
    const subscription = this.store.pipe(select(AuthSelector)).subscribe((user) => {
      this.user = user;
    })

    this.subscriptions.add(subscription);
  }


}
