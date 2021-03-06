import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@app/shared/services';

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
    this._route.params.pipe(takeUntil(this._destroy)).subscribe(params => {
      this._course = params['course'];
    });
    this.courses.pipe(takeUntil(this._destroy)).subscribe(data => {
      this._courses = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course() {
    return this._courses.find(a => {
      return this._course === a.id;
    });
  }

}
