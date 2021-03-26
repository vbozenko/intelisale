import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientsComponent} from './clients.component';

const routes = [
  {
    path: '',
    component: ClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
