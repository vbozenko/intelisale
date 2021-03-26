import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

const AUTH_DATA = 'auth_data';
const API_URL = `${environment.server}/api`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* Member variables */
  private subject = new BehaviorSubject<User>(null);

  public user$: Observable<User> = this.subject.asObservable();

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut: Observable<boolean>;

  /* Constructor */
  constructor(private http: HttpClient) {

    this.isLoggedIn$ = this.user$.pipe(
      map(userData => !!userData)
    );

    this.isLoggedOut = this.isLoggedIn$.pipe(
      map(loggedIn => !loggedIn)
    );

    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  /* Login */
  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(API_URL + '/login', {email, password}).pipe(
      tap(user => {
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  /* Logout */
  public logout(): void {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
