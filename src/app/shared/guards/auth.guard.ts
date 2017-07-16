import { Injectable } from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {first} from 'rxjs/operator/first';
import {map} from 'rxjs/operator/map';

@Injectable()
export class CanLoadGrades implements CanLoad {

  constructor (
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return first.call(map.call(this._authService.isLoggedIn, d => {
      if (d) {
        return true;
      } else {
        this._router.navigate(['/ausi']);
        return false;
      }
    }));
  }
}

@Injectable()
export class CanLoadGrading implements CanLoad {

  constructor (
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return first.call(map.call(this._authService.isGrader, d => {
      if (d) {
        return true;
      } else {
        this._router.navigate(['/ausi']);
        return false;
      }
    }));
  }
}

@Injectable()
export class CanLoadAdmin implements CanLoad {

  constructor (
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return first.call(map.call(this._authService.isAdmin, d => {
      if (d) {
        return true;
      } else {
        this._router.navigate(['/ausi']);
        return false;
      }
    }));
  }
}
