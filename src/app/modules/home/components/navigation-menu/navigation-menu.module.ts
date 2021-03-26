import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationMenuComponent} from './navigation-menu.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavigationMenuComponent
  ]
})
export class NavigationMenuModule {
}
