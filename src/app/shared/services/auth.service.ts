import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  loggedIn: Observable<boolean>;

  private _url: string = environment.API_ENDPOINT;
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _options = new RequestOptions({ headers: this._headers, withCredentials: true });
  private _loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private _router: Router,
    private userService: UserService,
    private http: Http
  ) {
    this.loggedIn = this._loggedIn.asObservable();
  }

  public login (username: string, password: string) {

    this._tempLogIn();

    // return this.http.post(this._url + 'login', { username, password }, this._options)
    //   .map((response: Response) => {
    //     return response;
    //   });
  }

  public logout () {
    this.userService.depopulate();
    this._loggedIn.next(false);
    this._router.navigate(['']);
    // this.http.post(this._url + 'logout', { }, this._options).subscribe();
  }

  private isLoggedIn () {
    return this.http.get(this._url + 'getUser', this._options);
  }

  private _tempLogIn() {
    this.http.get('../assets/data.json', this._options).subscribe(
      data => {
        this._loggedIn.next(true);
        this.userService.populate(data.json(), data.json().user);
      },
      error => {
        this._loggedIn.next(false);
      }
    );
  }
}
