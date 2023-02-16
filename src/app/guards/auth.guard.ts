import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils();

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if(!this.localStorageUtils.obterTokenUsuario()){
      this.router.navigate(['/auth'])
    }
    return true;
  }
}
