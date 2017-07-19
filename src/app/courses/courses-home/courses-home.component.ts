import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'vg-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent {

  courses = this._userService.courses;
  inCourses = this._userService.inactive;

  constructor(
    private _userService: UserService
  ) { }
}
