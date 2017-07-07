import { Injectable } from '@angular/core';
import {CanLoad, Route} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operator/first';

@Injectable()
export class CanLoadGrades implements CanLoad {

  constructor (
    private _authService: AuthService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return first.call(this._authService.loggedIn);
  }
}

@Injectable()
export class CanLoadGrading implements CanLoad {

  constructor (
    private _userService: UserService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return first.call(this._userService.isGrader);
  }
}

@Injectable()
export class CanLoadAdmin implements CanLoad {

  constructor (
    private _userService: UserService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return first.call(this._userService.isAdmin);
  }
}
