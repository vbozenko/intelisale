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

  /* ATRIBUTES */
  private subject = new BehaviorSubject<User>(null);
  public user$: Observable<User> = this.subject.asObservable();

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut: Observable<boolean>;

  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {

    /* Check if logged in */
    this.isLoggedIn$ = this.user$.pipe(
      map(userData => !!userData)
    );

    /* Check if logged out */
    this.isLoggedOut = this.isLoggedIn$.pipe(
      map(loggedIn => !loggedIn)
    );

    /* Save user to local storage */
    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  /* LOGIN */
  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(API_URL + '/login', {email, password}).pipe(
      tap(user => {
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  /* LOGOUT */
  public logout(): void {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
