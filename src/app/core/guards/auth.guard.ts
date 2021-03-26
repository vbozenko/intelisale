import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /* Check if a user is authenticated */
  private checkIfAuthenticated(): Observable<any> {
    return this.auth.isLoggedIn$
      .pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('/login'))
      );
  }
}
