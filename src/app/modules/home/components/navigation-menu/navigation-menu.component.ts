import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
