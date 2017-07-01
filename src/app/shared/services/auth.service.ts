import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  loggedIn: Observable<boolean>;

  private _url: string = environment.API_ENDPOINT;
  private _headers: Headers;
  private _options: RequestOptions;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: Http
  ) {
    this._headers = new Headers({ 'Content-Type': 'application/json' });
    this._options = new RequestOptions({ headers: this._headers, withCredentials: true });

    this.loggedIn = new Observable (observable => {
      this.isLoggedIn().subscribe(
        data => {
          observable.next(true);
          this.userService.populate(data.json(), data.json().utln);
        },
        error => {
          observable.next(false);
        }
      );
    });
  }

  public login (username: string, password: string) {
    return this.http.post(this._url + 'login', { username, password }, this._options)
      .map((response: Response) => {
        return response;
      });
  }

  public logout () {
    this.http.post(this._url + 'logout', { }, this._options).subscribe();
    this.router.navigate(['/signin']);
  }

  private isLoggedIn () {
    return this.http.get(this._url + 'getUser', this._options);
  }
}
