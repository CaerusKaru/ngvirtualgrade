import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {takeUntil} from 'rxjs/operator/takeUntil';

@Component({
  selector: 'vg-courses-course',
  templateUrl: './courses-course.component.html',
  styleUrls: ['./courses-course.component.scss']
})
export class CoursesCourseComponent implements OnInit, OnDestroy {

  courses = this._userService.courses;
  inactive = this._userService.inactive;

  private _course: string;
  private _courses = [];
  private _inactive = [];
  private _destroy = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    takeUntil.call(this._route.params, this._destroy).subscribe(params => {
      this._course = params['course'];
    });
    takeUntil.call(this.courses, this._destroy).subscribe(data => {
      this._courses = data;
    });
    takeUntil.call(this.inactive, this._destroy).subscribe(data => {
      this._inactive = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course() {
    return this._courses.find(a => a['name'] === this._course) || this._inactive.find(a => a['name'] === this._course);
  }

}