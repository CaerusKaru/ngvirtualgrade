import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Course} from '../classes/course';
import {Manager} from '../classes/manager';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {HttpClient} from '@angular/common/http';

interface AuthResponse {
  user: {
    grading: Course[];
    admin: Course[];
    courses: Course[];
    manage: Manager;
    username: string;
    term: string;
  }
}

const CurrentUser = gql`
  query {
    user {
      username
      groups
      manage {
        departments {
          courses {
            id
            name
            assigns
            term
          }
        }
        privileges
      }
      admin {
        id
        name
        assigns
        term
      }
      grading {
        id
        name
        assigns
        term
      }
      courses {
        id
        name
        assigns
        term
      }
    }
  }
`;

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
    private _apollo: Apollo,
    private _http: HttpClient,
    private _router: Router,
    private userService: UserService,
    private _snackbar: MatSnackBar
  ) {
    this._loadAuth().subscribe();
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

    this._http.post('/data/login', {username, password}).subscribe(
      data => {
        this._tempLogIn();
      },
      error => {
        console.log(error);
      }
    );
  }

  public logout () {
    this.userService.depopulate();
    this._logOut();
    this._router.navigate(['']);
    this._http.post('/data/logout', {}).subscribe();
  }

  private _loadAuth() {
    return new Observable<boolean>(obs => {
      this._apollo.watchQuery<AuthResponse>({query: CurrentUser}).subscribe(({data}) => {
        const userData = data.user;
        this._loggedIn.next(true);
        this._grader.next(userData.grading.length !== 0);
        this._admin.next(userData.admin.length !== 0);
        this._manage.next(userData.manage.privileges.length !== 0);
        this.userService.populate(userData, userData.username);
        obs.next(true);
        obs.complete();
      },
      error => {
        this._logOut();
        obs.next(false);
        obs.complete();
      });
      // this._http.get<AuthResponse>('/assets/data.json').subscribe(
      //   data => {
      //     this._loggedIn.next(true);
      //     this._grader.next(data.grading.length !== 0);
      //     this._admin.next(data.admin.length !== 0);
      //     this._manage.next(data.manage.privileges.length !== 0);
      //     this.userService.populate(data, data.username);
      //     obs.next(true);
      //     obs.complete();
      //   },
      //   error => {
      //     this._logOut();
      //     obs.next(false);
      //     obs.complete();
      //   }
      // );
    });
  }

  private _logOut() {
    this._loggedIn.next(false);
    this._grader.next(false);
    this._admin.next(false);
    this._manage.next(false);
  }

  private _tempLogIn() {
    this._loadAuth().subscribe(data => {
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
