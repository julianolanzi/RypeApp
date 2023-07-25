import {
  AuthSelector,
  isAdmin,
} from './../../shared/state-management/selectors/auth.selector';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { LoadOpRoutingIdAction } from 'src/app/shared/state-management/actions/overview-player/rounting-id/op-load-routing-id.actions';
import { Router } from '@angular/router';
import { OpPlayerIdRequestAction } from 'src/app/shared/state-management/actions/overview-player/search-player/op-load-player-id-request.action';
import { OpPlayerTimelineRequestAction } from 'src/app/shared/state-management/actions/overview-player/load-timeline/op-load-timeline-request-actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  
})
export class SidebarComponent {
  private subscriptions: Subscription = new Subscription();
  isAdmin!: any;
  isAdminTeam$: Observable<boolean> | undefined;
  isUser!:any;
  public user!: UserLoginSuccess;
  constructor(private store: Store<GlobalState>, private router: Router) {
    this.isUser = true;
  }
  ngOnInit(): void {
    this.isAdminTeam$ = of(false);
    this.isAdmin = false;
    this.getCookie();
    let modeText = document.querySelector('.mode-text') as HTMLElement;
    let modeSwitch = document.querySelector('.toggle-switch') as HTMLElement;
    let body = document.querySelector('.container-admin') as HTMLElement;


    let menuActive = document.querySelectorAll('.menu-link');
    
    menuActive.forEach((element) => {
      element.addEventListener('click', () => {
        menuActive.forEach((element) => {
          element.classList.remove('active');
        });
        element.classList.add('active');
      });
    });
  
    
    


    modeSwitch.addEventListener('click', () => {
      this.store.dispatch(new LoadingNotificationsDisabledAction());
      body.classList.toggle('dark');
      
      if (body.classList.contains('dark')) {
        modeText.innerText = 'Dark mode';
        let isDarkMode = true;
        this.setCookie(isDarkMode);
      } else {
        modeText.innerText = 'Light mode';
        let isDarkMode = false;
        this.setCookie(isDarkMode);
      }
    });

    this.loadUser();

  }

  ngAfterViewInit(): void {
    let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
    let menuActive = document.querySelectorAll('.sub-menu-item');
    console.log(menuActive);
    let sidebar = document.querySelector('.sidebar-container') as HTMLElement;
    let containerAll = document.querySelector('.container-all') as HTMLElement;

    menuActive.forEach((element) => {
      element.addEventListener('click', () => {
        menuActive.forEach((element) => {
          element.classList.remove('active');
          sidebar.classList.add('close');
          containerAll.classList.add('close');
        });
        element.classList.remove('active');
        sidebar.classList.add('close');
        containerAll.classList.add('close');
      });
    });
  }

  setCookie(isDarkMode: boolean) {
    const d = new Date();
    d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie =
      'RypeDarkMode' + '=' + isDarkMode + ';' + expires + ';path=/';
  }

  getCookie() {
    const name = 'RypeDarkMode' + '=';
    const Cdecoded = decodeURIComponent(document.cookie);
    const cArr = Cdecoded.split('; ');
    let res;

    let body = document.querySelector('.container-admin') as HTMLElement;
    let modeSwitch = document.querySelector('.toggle-switch') as HTMLElement;

    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });

    if (!res) {
      let isDarkMode = false;
      this.setCookie(isDarkMode);
    }

    if (res == 'true') {
      body.classList.toggle('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;

        if (user.rolesTeam == 'admin' || user.rolesTeam == 'sub-admin') {
          this.isAdminTeam$ = of(true);
        }
        if (user.role == 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
   
        }
      });

    this.subscriptions.add(subscription);
  }

  OpenOverviewPlayer(){
    this.store.dispatch(new LoadingSmallActiveAction());
    this.store.dispatch(new LoadOpRoutingIdAction(this.user.id));
    this.store.dispatch(new OpPlayerIdRequestAction(this.user.id));
    this.store.dispatch(new OpPlayerTimelineRequestAction(this.user.id))
    this.router.navigate(['player/'+ this.user.nickname]);
  }

  logaout(){
    window.location.reload();
  }
}
