import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {HomeMenuService} from '../../home/home-menu.service';

@Injectable()
export class AdminResolver implements Resolve<boolean> {

  private _courses = this._userService.admin;

  constructor(
    private _userService: UserService,
    private _homeService: HomeMenuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._courses.subscribe(data => {
        this._homeService.setCourses([this._homeService.constructCourses(data, 'admin', true)]);
        obs.next(true);
        obs.complete();
      });
    });
  }
}
