import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {NavigationMenuModule} from './components/navigation-menu/navigation-menu.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NavigationMenuModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
