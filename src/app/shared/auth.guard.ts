import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private router : Router,
    private authService : AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.loggedIn.map((auth) => {
        if (auth) {
          return true;
        }
        this.router.navigate(['/signin'], { queryParams: { returnPath: state.url }});
        return false;
      }).first();
  }
}
