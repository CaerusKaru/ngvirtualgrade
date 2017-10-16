import { Injectable } from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {first, map} from 'rxjs/operators';
import {AuthService} from '@app/shared/services';

@Injectable()
export class CanLoadCourses implements CanLoad {

  constructor (
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return this._authService.isLoggedIn.pipe(
      map(d => {
        if (d) {
          return true;
        } else {
          this._router.navigate(['/ausi']);
          return false;
        }
      }),
      first()
    );
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

    return this._authService.isGrader.pipe(
      map(d => {
        if (d) {
          return true;
        } else {
          this._router.navigate(['/ausi']);
          return false;
        }
      }),
      first()
    );
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

    return this._authService.isAdmin.pipe(
      map(d => {
        if (d) {
          return true;
        } else {
          this._router.navigate(['/ausi']);
          return false;
        }
      }),
      first()
    );
  }
}

@Injectable()
export class CanLoadManage implements CanLoad {

  constructor (
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return this._authService.isManager.pipe(
      map(d => {
        if (d) {
          return true;
        } else {
          this._router.navigate(['/ausi']);
          return false;
        }
      }),
      first()
    );
  }
}
