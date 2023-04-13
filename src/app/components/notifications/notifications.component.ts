import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import {
  TeamNotifications,
  UserNotifications,
} from 'src/app/shared/state-management/selectors/notifications.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TeamNotificationsSuccess } from 'src/app/models/notifications/notifications-team-success';
import { TeamNotificationsGetRequest } from 'src/app/shared/state-management/actions/notifications/team-notifications/get-notifications/notifications-team-load-request.actions';
import { NotificationsGetUserRequest } from 'src/app/shared/state-management/actions/notifications/user-notifications/get-notifications/notifications-load-request.actions';
import { DeleteNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/delete-notifications/notifications-delete-load-request.actions';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  public notific!: UserNotificationsSuccess[];
  public teamnf!: TeamNotificationsSuccess[];
  ischange!: boolean;
  timer!: Number;

  isAdmin!: any;
  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>) {
    this.ischange = true;
  }

  ngOnInit(): void {
    let toggle = document.querySelector('.link-notifications') as HTMLElement;
    let containerNotifica = document.querySelector(
      '.container-notifications'
    ) as HTMLElement;

    toggle.addEventListener('click', () => {
      containerNotifica.classList.toggle('close');
    });
    this.loadPermission();
    this.loadNotifications();
  }

  public openNotifi(item: UserNotificationsSuccess) {
    console.log(item);
  }

  public loadPermission() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
        if (user.rolesTeam == 'admin' || user.rolesTeam == 'sub-admin') {
          this.isAdmin = true;
          this.store.dispatch(
            new TeamNotificationsGetRequest(this.user.idTeam)
          );
          this.loadNotificationsTeam();
        } else {
          this.isAdmin = false;
        }
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
      .subscribe((notif) => {
        this.notific = notif;
      });

    this.subscriptions.add(subscription);
  }
  public loadNotificationsTeam() {
    const subscription = this.store
      .pipe(select(TeamNotifications))
      .subscribe((notif) => {
        this.teamnf = notif;
      });

    this.subscriptions.add(subscription);
  }

  refreshNotifications() {
    this.ischange = false;
    if (this.isAdmin == true) {
      this.store.dispatch(new NotificationsGetUserRequest(this.user.id));
      this.store.dispatch(new TeamNotificationsGetRequest(this.user.idTeam));
      this.ischange = false;
      this.onTimer();
    } else {
      this.store.dispatch(new NotificationsGetUserRequest(this.user.id));
      this.ischange = false;
      this.onTimer();
    }
  }
  deleteNotification(item: UserNotificationsSuccess) {
    const newarray = [];

    for (let index of this.notific) {
      if (index != item) {
        newarray.push(index);
        this.notific = newarray;
      }
    }
    this.store.dispatch(new DeleteNotificationsRequest(item._id));

    if(newarray.length == 0 ){
      this.notific = [];
    }
  }
  deleteTeamNotification(item: UserNotificationsSuccess) {
    const newarray = [];
    for (let index of this.teamnf) {
      if (index != item) {
        newarray.push(index);
        this.teamnf = newarray;
      }
    }
    this.store.dispatch(new DeleteNotificationsRequest(item._id));

    if(newarray.length == 0 ){
      this.teamnf = [];
    }
  }
  acceptRequest(item: UserNotificationsSuccess) {
    console.log('Aceitando item' + item._id);
  }
  rejectRequest(item: UserNotificationsSuccess) {
    console.log('rejeitando item' + item._id);
  }
}
