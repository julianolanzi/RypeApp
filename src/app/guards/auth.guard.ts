import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from '../models/auth/user-login-success';
import { AuthService } from '../services/auth.service';
import { AuthSelector } from '../shared/state-management/selectors/auth.selector';
import { GlobalState } from '../shared/state-management/states/global.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<GlobalState>
  ) {
    this.loadUser();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.user.token) {
      this.router.navigate(['/auth']);
    }
    return true;
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });

    this.subscriptions.add(subscription);
  }
}
