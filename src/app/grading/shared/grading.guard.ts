import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {first} from 'rxjs/operators/first';
import {map} from 'rxjs/operators/map';
import {UserService} from '@app/shared/services';

@Injectable()
export class GradingGuard implements CanActivate {

  constructor (private _userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._userService.grading.pipe(
      map((d: any[]) => next.params.hasOwnProperty('course') && d.find(b => b.name === next.params['course']) &&
        (d.find(b => b.name === next.params['course']).length !== 0)
            ),
      first()
    );
  }
}
