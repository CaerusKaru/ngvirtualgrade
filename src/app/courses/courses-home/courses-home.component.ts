import {Component} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'vg-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent {

  courses = this._userService.courses.pipe(map(v => v.filter(a => this._userService.isTerm(a.term))));
  inCourses = this._userService.courses.pipe(map(v => v.filter(a => !this._userService.isTerm(a.term))));

  constructor(
    private _userService: UserService
  ) { }
}
