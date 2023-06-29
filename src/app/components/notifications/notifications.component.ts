import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import {
  UserNotifications,
} from 'src/app/shared/state-management/selectors/notifications.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

import { NotificationsGetUserRequest } from 'src/app/shared/state-management/actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { DeleteNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/delete-notifications/notifications-delete-load-request.actions';
import { AcceptInviteNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/accept-invite-notifications/notifications-accept-invite-request.actions';
import { RecuseInviteNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/recuse-invite-notifications/notifications-recuse-invite-request.actions';
import { isNotifications } from 'src/app/shared/state-management/selectors/global-pages.selector';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  public Allnotifications!: UserNotificationsSuccess[];
  InviteNotification!: UserNotificationsSuccess;
  ischange: boolean = true;
  timer!: Number;
  enableNotifications$!: Observable<boolean>;

  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  isNotifica: boolean = false;
  constructor(private store: Store<GlobalState>) {
    this.enableNotifications$ = this.store.pipe(select(isNotifications));
  }

  ngOnInit(): void {
    // let toggle = document.querySelector('.link-notifications') as HTMLElement;
    // let containerNotifica = document.querySelector(
    //   '.header-dropdown'
    // ) as HTMLElement;

    // toggle.addEventListener('click', () => {
    //   containerNotifica.classList.toggle('active');
    // });
    this.loadDataUser();
    this.loadNotifications();
  }
  
  public loadDataUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });

    this.subscriptions.add(subscription);
  }
  onTimer() {
    this.timer = 10;

    let i = 10;
    const interval = setInterval((): void => {
      this.timer = i;
      if (i-- == 0) {
        this.ischange = true;
        clearInterval(interval);
      }
    }, 1000);
  }
  public loadNotifications() {
    const subscription = this.store
      .pipe(select(UserNotifications))
      .subscribe((response) => {
        this.Allnotifications = response;
        if(this.Allnotifications.length == 0){
          this.isNotifica = true;
        }else{
          this.isNotifica = false;
        }
      });

    this.subscriptions.add(subscription);
  }
  refreshNotifications() {
    this.ischange = false;
    this.store.dispatch(new NotificationsGetUserRequest(this.user.id));
    this.onTimer();

  }
  deleteNotification(item: UserNotificationsSuccess) {
    const newarray = [];

    for (let index of this.Allnotifications) {
      if (index != item) {
        newarray.push(index);
        this.Allnotifications = newarray;
      }
    }

    this.store.dispatch(new DeleteNotificationsRequest(item._id));

    if (newarray.length == 0) {
      this.Allnotifications = [];
    }
  }
  acceptRequest(item: UserNotificationsSuccess) {
    this.InviteNotification = item;
    this.store.dispatch(new AcceptInviteNotificationsRequest(this.InviteNotification));
  }
  rejectRequest(item: UserNotificationsSuccess) {
    this.InviteNotification = item;
    this.store.dispatch(new RecuseInviteNotificationsRequest(this.InviteNotification));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
