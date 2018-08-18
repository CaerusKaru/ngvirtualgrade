import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '@app/shared/services';

@Injectable({providedIn: 'root'})
export class HomeResolver implements Resolve<boolean> {

  constructor(
    private _authService: AuthService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._authService.isLoggedIn.subscribe(data => {
        obs.next(true);
        obs.complete();
      })
    });
  }
}
