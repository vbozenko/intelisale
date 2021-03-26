import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client';
import {environment} from '../../../../../../environments/environment';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {
  }

  /* LOAD ALL CLIENTS */
  public loadAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.server}/api/clients`)
      .pipe(
        shareReplay()
      );
  }

  /* SAVE CLIENT */
  public saveClient(clientId: number, changes: Partial<Client>): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/clients/${clientId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
