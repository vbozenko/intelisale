import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./components/clients/clients.module').then(m => m.ClientsModule),
      },
      {
        path: '',
        redirectTo: '/home/clients',
        pathMatch: 'full'
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
