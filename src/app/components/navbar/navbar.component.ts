import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';
import { GlobalState } from './../../shared/state-management/states/global.state';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { Subscription, Observable } from 'rxjs';
import { isNotifications, url } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { NotificationsGetUserRequest } from 'src/app/shared/state-management/actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { UserNotifications } from 'src/app/shared/state-management/selectors/notifications.selector';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { LoadingNotificationsActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-active.actions';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public notific!: UserNotificationsSuccess[];
  isNotifications!: boolean;
  isAdmin!: any;
  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  url$!: Observable<string>;
  enableNotifications$!: Observable<boolean>;
  constructor(
    private store: Store<GlobalState>
  ) {
    this.enableNotifications$ = this.store.pipe(select(isNotifications))
  }

  ngOnInit(): void {
    this.loadUser();
    this.url$ = this.store.pipe(select(url));
    this.store.dispatch(new NotificationsGetUserRequest(this.user.id));
    this.loadNotifications();

  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;

        if (user.rolesTeam == 'admin' || user.rolesTeam == 'sub-admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });

    this.subscriptions.add(subscription);
  }

  public loadNotifications() {
    const subscription = this.store
      .pipe(select(UserNotifications))
      .subscribe((notif) => {
        this.notific = notif;

        if (notif.length !== 0) {
          this.isNotifications = true;
        } else {
          this.isNotifications = false;
        }
      });

    this.subscriptions.add(subscription);
  }

  public enableNotifications() {
   
    let containerNotifica = document.querySelector(
      '.header-dropdown'
    ) as HTMLElement;

    let contain = containerNotifica.classList.contains('active');

    if (contain == false) {
      this.store.dispatch(new LoadingNotificationsActiveAction());
    } if(contain == true){
      this.store.dispatch(new LoadingNotificationsDisabledAction());
    
    }
  }
}
