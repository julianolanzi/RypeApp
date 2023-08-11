import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';
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
import { isNotifications, smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadOpRoutingTeamIdAction } from 'src/app/shared/state-management/actions/overview/team/routing-id-team/op-load-routing-team-id.actions';
import { Router } from '@angular/router';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { LoadOpRoutingIdAction } from 'src/app/shared/state-management/actions/overview/user/rounting-id/op-load-routing-id.actions';

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
  enableSmallLoading$!: Observable<boolean>;
  notificationsAll$!: Observable<UserNotificationsSuccess[]>;

  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  isNotifica: boolean = false;
  constructor(private store: Store<GlobalState>,private router: Router) {
    this.enableNotifications$ = this.store.pipe(select(isNotifications));
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
    this.notificationsAll$ = this.store.pipe(select(UserNotifications));
  }

  ngOnInit(): void {

    this.loadDataUser();

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

  refreshNotifications() {
    this.subscriptions.unsubscribe();
    this.isNotifica = false;
    this.ischange = false;
    this.store.dispatch(new NotificationsGetUserRequest(this.user.id));
    this.store.dispatch(new LoadingSmallActiveAction({ flag: true, message: 'Carregando Notificações' }));
    this.onTimer();
  }
  deleteNotification(item: UserNotificationsSuccess) {
    this.store.dispatch(new DeleteNotificationsRequest(item._id));
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

  overviewNofitification(notification: any){
    if(notification.type == "user"){
      this.store.dispatch(new LoadOpRoutingTeamIdAction(notification.team));
      this.router.navigate(['team-overview']);
      this.store.dispatch(new LoadingNotificationsDisabledAction());
    }
    if(notification.type == "team"){
      this.store.dispatch(new LoadOpRoutingIdAction(notification.user));
      this.router.navigate(['player/'+ notification.description.name]);
      this.store.dispatch(new LoadingNotificationsDisabledAction());
    }
    if(notification.type == "like" || notification.type == "love" || notification.type == "good" || notification.type == "omg" || notification.type == "pistola" ||notification.type == "aff"){
      this.store.dispatch(new LoadOpRoutingIdAction(notification.user));
      this.router.navigate(['player/'+ notification.description.name]);
      this.store.dispatch(new LoadingNotificationsDisabledAction());
    }
      
  }

  verifyNotifications() {
    if (this.Allnotifications.length == 0) {
      this.isNotifica = true;
    } else {
      this.isNotifica = false;
    }
  }


}
