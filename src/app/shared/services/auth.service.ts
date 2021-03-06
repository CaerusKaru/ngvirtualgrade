import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';

import {Apollo} from 'apollo-angular';
import {Observable, ReplaySubject} from 'rxjs';

import {environment} from '@env/environment';
import {UserService} from '@app/shared/services/user.service';
import {AuthResponse} from '@app/shared/graphql/types/AuthResponse';
import {CurrentUser} from '@app/shared/graphql/queries/CurrentUser';


@Injectable({providedIn: 'root'})
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

  private _userQuery$ = this._apollo.query<AuthResponse>({
    query: CurrentUser,
    fetchPolicy: 'network-only'
  });

  constructor(
    private _apollo: Apollo,
    private _http: HttpClient,
    private _router: Router,
    private _userService: UserService,
    private _snackbar: MatSnackBar
  ) {
    this._loadAuth(true) // .subscribe();
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
    this._http.post(this._url + '/login', {username, password}).subscribe(
      data => {
        this._loadAuth(false);
      },
      error => {
        this._notify(false);
      }
    );
  }

  public logout () {
    this._userService.depopulate();
    this._apollo.getClient().cache.reset();
    this._logOut();
    this._router.navigate(['']);
    this._http.post(this._url + '/logout', {}).subscribe();
  }

  private _loadAuth(startup: boolean) {
    this._userQuery$
      .subscribe((data) => {
        const userData = data.data.user;
        this._loggedIn.next(true);
        this._grader.next(userData.grading.length !== 0);
        this._admin.next(userData.admin.length !== 0);
        this._manage.next(userData.manage.departments.length !== 0);
        this._userService.populate(userData, userData.username);
        if (!startup) {
          this._notify(true);
        }
      },
      error => {
        this._apollo.getClient().resetStore();
        this._logOut();
        if (!startup) {
          this._notify(false);
        }
      });
  }

  private _notify(success: boolean) {
    if (success) {
      this._snackbar.open('Login successful', '', {
        duration: 1250
      });
    } else {
      this._snackbar.open('Error logging in', '', {
        duration: 1250
      });
    }
  }

  private _logOut() {
    this._loggedIn.next(false);
    this._grader.next(false);
    this._admin.next(false);
    this._manage.next(false);
  }
}
