import {Component} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {map} from 'rxjs/operator/map';

@Component({
  selector: 'vg-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent {

  courses = map.call(this._userService.courses, v => v.filter(a => this._userService.isTerm(a.term)));
  inCourses = map.call(this._userService.courses, v => v.filter(a => !this._userService.isTerm(a.term)));

  constructor(
    private _userService: UserService
  ) { }
}
