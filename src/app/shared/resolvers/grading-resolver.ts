import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {HomeMenuService} from '@app/home/home-menu.service';
import {UserService} from '@app/shared/services';

@Injectable({providedIn: 'root'})
export class GradingResolver implements Resolve<boolean> {

  private _courses = this._userService.grading;

  constructor(
    private _userService: UserService,
    private _homeService: HomeMenuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._courses.subscribe(data => {
        this._homeService.setCourses([this._homeService.constructCourses(data, 'grading', true)]);
        obs.next(true);
        obs.complete();
      });
    });
  }
}
