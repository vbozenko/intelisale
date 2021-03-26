import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {Client} from './models/client';
import {ClientsService} from './services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public clients$: Observable<Client[]>;

  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;


  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.reloadClients();
    this.initTableOptions();
  }

  public reloadClients(): void {
    this.clients$ = this.clientsService.loadAllClients();
  }

  private initTableOptions() {

    this.columnDefs = [
      {headerName: 'ID', field: 'id', sortable: true, filter: true},
      {headerName: 'Name', field: 'name', sortable: true, filter: true},
      {headerName: 'Address', field: 'address', sortable: true, filter: true},
      {headerName: 'Code', field: 'code', sortable: true, filter: true},
      {headerName: 'Total Turnover', field: 'total_turnover', sortable: true, filter: true},
      {headerName: 'Order Date', field: 'order_date', sortable: true, filter: true}
    ];

    this.defaultColDef = {
      flex: 1,
      resizable: true,
      editable: true,
    };

  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  public onRowEditingStopped(event): void {

    const client = event.node.data;

    const changes = {...client};
    delete changes.id;

    this.clientsService.saveClient(client.id, changes)
      .subscribe(
        noop,
        error => alert('Save operation to backend failed.')
      );
  }
}
