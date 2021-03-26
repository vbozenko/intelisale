import {TestBed} from '@angular/core/testing';

import {ClientsService} from './clients.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../../../../environments/environment';
import {clientTestData} from './test-data';
import {Client} from '../models/client';
import {HttpErrorResponse} from '@angular/common/http';

describe('ClientsService', () => {
  let service: ClientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClientsService
      ]
    });
    service = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all clients', () => {
    service.loadAllClients()
      .subscribe(clients => {

        expect(clients).toBeTruthy('No clients data returned');

        expect(clients.length).toBe(5, 'incorrect number of total clients');

        const client = clients.find(c => c.id === 5);

        expect(client.name).toBe('CONJURICA');
      });

    const req = httpTestingController.expectOne(`${environment.server}/api/clients`);

    expect(req.request.method).toEqual('GET');

    req.flush(clientTestData);
  });

  it('should save client data', () => {
    const changes: Partial<Client> = {name: 'CONJURICA TESTED'};

    service.saveClient(5, changes)
      .subscribe(client => {

        expect(client.id).toBe(5);

      });

    const req = httpTestingController.expectOne(`${environment.server}/api/clients/5`);

    expect(req.request.method).toEqual('PUT');

    expect(req.request.body.name).toEqual(changes.name);

    req.flush({
      ...clientTestData[4],
      ...changes
    });
  });

  it('should give an error if saving the client fails', () => {

    const changes: Partial<Client> = {name: 'CONJURICA TESTED'};

    service.saveClient(5, changes)
      .subscribe(
        () => fail('the save client operation should have failed'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );

    const req = httpTestingController.expectOne(`${environment.server}/api/clients/5`);
    expect(req.request.method).toEqual('PUT');
    req.flush('Save client failed', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
