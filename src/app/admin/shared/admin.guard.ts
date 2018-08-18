import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {UserService} from '@app/shared/services';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor (private _userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._userService.admin.pipe(
      map((d: any[]) => next.params.hasOwnProperty('course') && d.find(b => b.id === next.params['course']) &&
        (d.find(b => b.id === next.params['course']).length !== 0)),
      take(1)
    );
  }
}
