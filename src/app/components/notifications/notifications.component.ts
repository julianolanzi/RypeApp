import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { UserNotifications } from 'src/app/shared/state-management/selectors/notifications.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  // notif$: Observable<UserNotificationsSuccess[]> =
  //   this.store.select(UserNotifications);
  title = 'af-notification';
  message: any = null;
  public notific!: UserNotificationsSuccess[];

  isAdmin!: any;
  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>) {}

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
    this.requestPermission();
    this.listen();
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
      });

    this.subscriptions.add(subscription);
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Hurraaa!!! we got the token.....');
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
