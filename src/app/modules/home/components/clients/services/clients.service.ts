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

  constructor(private http: HttpClient) {
  }

  public loadAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.server}/api/clients`)
      .pipe(
        shareReplay()
      );
  }

  public saveClient(clientId: number, changes: Partial<Client>): Observable<any> {
    return this.http.put<any>(`${environment.server}/api/clients/${clientId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
