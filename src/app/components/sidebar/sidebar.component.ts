import {
  AuthSelector,
  isAdmin,
} from './../../shared/state-management/selectors/auth.selector';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private subscriptions: Subscription = new Subscription();
  isAdmin!: any;
  isAdminTeam!: any;
  public user!: UserLoginSuccess;
  constructor(private store: Store<GlobalState>) {}
  ngOnInit(): void {
    this.getCookie();
    let sidebar = document.querySelector('nav') as HTMLElement;
    let sidebarContainer = document.querySelector(
      '.sidebar-container'
    ) as HTMLElement;
    let toggle = document.querySelector('.toggle') as HTMLElement;

    let adminContent = document.querySelector(
      '.container-admin-content'
    ) as HTMLElement;

    let modeSwitch = document.querySelector('.toggle-switch') as HTMLElement;
    let body = document.querySelector('.container-admin') as HTMLElement;
    let modeText = document.querySelector('.mode-text') as HTMLElement;

    let list = document.querySelectorAll('.nav-link');

    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let subMenu = document.querySelectorAll('.sub-item');

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('close');
      sidebarContainer.classList.toggle('close');
      adminContent.classList.toggle('close');
    });

    list.forEach((linkItem, index) => {
      linkItem.addEventListener('click', () => {
        document.querySelector('.active')?.classList.remove('active');
        linkItem.classList.add('active');
      });
    });

    subMenu.forEach((linkItem, index) => {
      linkItem.addEventListener('click', () => {
        if (width < 769) {
          sidebar.classList.toggle('close');
          sidebarContainer.classList.toggle('close');
          adminContent.classList.toggle('close');
        }
      });
    });

    modeSwitch.addEventListener('click', () => {
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
          this.isAdminTeam = true;
        }
        if (user.role == 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
          this.isAdminTeam = false;
        }
      });

    this.subscriptions.add(subscription);
  }

  logaout(){
    window.location.reload();
  }
}
