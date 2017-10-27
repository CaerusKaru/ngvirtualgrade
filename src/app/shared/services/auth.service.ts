import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Course, Manage, Term} from '@app/shared/classes';
import {UserService} from '@app/shared/services/user.service';

interface AuthResponse {
  user: {
    id: number;
    grading: Course[];
    admin: Course[];
    courses: Course[];
    instr: Course[];
    manage: Manage;
    username: string;
    term: Term;
  }
}

const CurrentUser = gql`
query {
  user {
    username
    groups
    term {
      term
    }
    manage {
      departments {
        courses {
          id
          name
          term {
            term
          }
        }
      }
    }
    admin {
      id
      name
      assignments {
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    grading {
      id
      name
      assignments {
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    courses {
      id
      name
      assignments {
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
    }
    instr {
      id
      name
      assignments {
        name
        description
        type {
          type
        }
      }
      term {
        term
      }
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

  private _userQuery$ = this._apollo.watchQuery<AuthResponse>({query: CurrentUser}).valueChanges;

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

    this._http.post(this._url + '/login', {username, password}).subscribe(
      data => {
        this._loadAuth().subscribe(o => {
          if (o) {
            this._snackbar.open('Login successful', '', {
              duration: 1250
            });
          } else {
            this._snackbar.open('Error logging in', '', {
              duration: 1250
            });
          }
        });
      },
      error => {
      }
    );
  }

  public logout () {
    this.userService.depopulate();
    this._apollo.getClient().cache.reset();
    this._logOut();
    this._router.navigate(['']);
    this._http.post(this._url + '/logout', {}).subscribe();
  }

  private _loadAuth() {
    return new Observable<boolean>(obs => {
      this._userQuery$
        .subscribe((data) => {
          const userData = data.data.user;
          this._loggedIn.next(true);
          this._grader.next(userData.grading.length !== 0);
          this._admin.next(userData.admin.length !== 0);
          this._manage.next(userData.manage.departments.length !== 0);
          this.userService.populate(userData, userData.username);
          obs.next(true);
          obs.complete();
        },
        error => {
          this._apollo.getClient().resetStore();
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
}
