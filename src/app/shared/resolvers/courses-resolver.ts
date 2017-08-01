import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {HomeMenuService} from '../../home/home-menu.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  private _courses = this._userService.courses;

  constructor(
    private _userService: UserService,
    private _homeService: HomeMenuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._courses
        .subscribe(courses => {
          this._userService.term
            .subscribe(term => {
              const currentCourses = courses.filter(v => v['term'] === term);
              const prevCourses = courses.filter(v => v['term'] !== term);
              this._homeService.setCourses([this._homeService.constructCourses(currentCourses, 'courses', true),
                this._homeService.constructCourses(prevCourses, 'courses', false)]);
              obs.next(true);
              obs.complete();
            });
        });
    });
  }
}
