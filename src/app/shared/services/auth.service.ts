import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

  private _url: string = environment.API_ENDPOINT;
  private _loggedIn = new ReplaySubject<boolean>(1);
  private _loggedIn$ = this._loggedIn.asObservable();
  private _grader = new ReplaySubject<boolean>(1);
  private _grader$ = this._grader.asObservable();
  private _admin = new ReplaySubject<boolean>(1);
  private _admin$ = this._admin.asObservable();
  private _manage = new ReplaySubject<boolean>(1);
  private _manage$ = this._manage.asObservable();

  constructor(
    private _router: Router,
    private userService: UserService,
    private _http: HttpClient,
    private _snackbar: MdSnackBar
  ) {
    this._loadAuth('../assets/data.json').subscribe();
  }

  get isLoggedIn(): Observable<boolean> {
    return this._loggedIn$;
  }

  get isAdmin(): Observable<boolean> {
    return this._admin$;
  }

  get isGrader(): Observable<boolean> {
    return this._grader$;
  }

  get isManager(): Observable<boolean> {
    return this._manage$;
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
    this._logOut();
    this._router.navigate(['']);
    // this.http.post(this._url + 'logout', { }, this._options).subscribe();
  }

  private _loadAuth(dataSource) {
    return new Observable<boolean>(obs => {
      this._http.get(dataSource).subscribe(
        data => {
          this._loggedIn.next(true);
          this._grader.next(data['grading'].length !== 0);
          this._admin.next(data['admin'].length !== 0);
          this._manage.next(data['manage']['privileges'].length !== 0);
          this.userService.populate(data, data['user']);
          obs.next(true);
          obs.complete();
        },
        error => {
          this._logOut();
          obs.next(false);
          obs.complete();
        }
      );
    });
  }

  private _logOut() {
    this._loggedIn.next(false);
    this._grader.next(false);
    this._admin.next(false);
    this._manage.next(false);
  }

  private _tempLogIn() {
    this._loadAuth('../assets/data.json').subscribe(data => {
      if (data) {
        this._snackbar.open('Login successful', '', {
          duration: 1250
        });
      } else {
        this._snackbar.open('Error logging in', '', {
          duration: 1250
        });
      }
    });
  }
}
