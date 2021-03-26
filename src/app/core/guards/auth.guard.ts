import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  /* CONSTRUCTOR */
  constructor(private auth: AuthService,
              private router: Router) {
  }

  /* CAN ACTIVATE ROUTE */
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /* CAN ACTIVATE CHILD ROUTE */
  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /* CHECK USER AUTHENTICATION */
  private checkIfAuthenticated(): Observable<any> {
    return this.auth.isLoggedIn$
      .pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('/login'))
      );
  }
}
