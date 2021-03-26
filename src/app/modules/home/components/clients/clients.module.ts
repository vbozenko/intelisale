import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients.component';
import {ClientsRoutingModule} from './clients-routing.module';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    AgGridModule.withComponents([])
  ]
})
export class ClientsModule {
}
