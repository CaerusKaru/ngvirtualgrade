import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {HomeMenuService} from '../../home/home-menu.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  private _courses = this._userService.courses;
  private _inCourses = this._userService.inactive;

  constructor(
    private _userService: UserService,
    private _homeService: HomeMenuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._courses
        .subscribe(courses => {
          this._inCourses
            .subscribe(inactive => {
              this._homeService.setCourses([this._homeService.constructCourses(courses, 'courses', true),
              this._homeService.constructCourses(inactive, 'courses', false)]);
              obs.next(true);
              obs.complete();
            })
        });
    });
  }
}
