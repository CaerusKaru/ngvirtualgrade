import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'vg-grading-course',
  templateUrl: './grading-course.component.html',
  styleUrls: ['./grading-course.component.scss']
})
export class GradingCourseComponent implements OnInit, OnDestroy {

  courses = this._userService.grading;

  private _course: string;
  private _courses = [];
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
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course() {
    return this._courses.find(a => a['name'] === this._course);
  }

}
