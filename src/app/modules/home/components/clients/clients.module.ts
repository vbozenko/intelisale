import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients.component';
import {ClientsRoutingModule} from './clients-routing.module';
import {AgGridModule} from 'ag-grid-angular';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class ClientsModule {
}
