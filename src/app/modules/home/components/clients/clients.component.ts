import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {Client} from './models/client';
import {ClientsService} from './services/clients.service';
import * as moment from 'moment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  /* ATTRIBUTES */
  public clients$: Observable<Client[]>;

  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public defaultColDef;

  /* CONSTRUCTOR */
  constructor(private clientsService: ClientsService) {
  }

  /* ON INIT */
  ngOnInit(): void {
    this.reloadClients();
    this.initTableOptions();
  }

  /* REALOAD CLIENTS */
  public reloadClients(): void {
    this.clients$ = this.clientsService.loadAllClients();
  }

  /* TABLE OPTIONS */
  private initTableOptions(): void {

    /* Column definitions */
    this.columnDefs = [
      {headerName: 'ID', field: 'id'},
      {headerName: 'Name', field: 'name'},
      {headerName: 'Address', field: 'address'},
      {headerName: 'Code', field: 'code'},
      {headerName: 'Total Turnover (RSD Million)', field: 'total_turnover', filter: 'agNumberColumnFilter'},
      {
        headerName: 'Last Order Date',
        field: 'order_date',
        valueFormatter: (params) => {
          return moment(params.data.order_date).format('MM/DD/YYYY');
        }
      }
    ];

    /* Default column definitions */
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 150
    };
  }

  /* TABLE GRID READY */
  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  /* TABLE ROW EDIT STOP AND SAVE */
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
