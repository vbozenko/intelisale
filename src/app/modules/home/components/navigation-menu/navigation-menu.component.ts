import {Component} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {

  /* CONSTRUCTOR */
  constructor(public auth: AuthService,
              private router: Router) {
  }

  /* LOGOUT */
  public logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
