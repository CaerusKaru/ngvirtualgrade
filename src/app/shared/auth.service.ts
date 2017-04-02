import { Injectable } from '@angular/core';
import {Constants} from "../constants";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private userService: UserService,
    private http: Http
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });

    this.loggedIn = new Observable (observable => {
      this.isLoggedIn().subscribe(
        data => {
          observable.next(true);
          this.userService.populate(data.json());
        },
        error => {
          observable.next(false);
        }
      );
    });
  }

  public loggedIn : Observable<boolean>;

  public login (username: string, password: string) {
    return this.http.post(this.url + 'login', { username, password }, this.options)
      .map((response: Response) => {
        return response;
      });
  }

  public logout () {
    this.http.post(this.url + 'logout', { }, this.options).subscribe();
    this.router.navigate(['/signin']);
  }

  private url: string = Constants.API_ENDPOINT;
  private headers : Headers;
  private options : RequestOptions;

  private isLoggedIn () {
    return this.http.get(this.url + 'getUser', this.options);
  }
}
