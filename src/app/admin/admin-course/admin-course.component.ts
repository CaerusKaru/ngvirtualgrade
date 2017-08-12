import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../shared/classes/course';

@Component({
  selector: 'vg-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit, OnDestroy {

  courses = this._userService.admin;

  private _course: string;
  private _courseId: number;
  private _courses = [];
  private _destroy = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    takeUntil.call(this._route.params, this._destroy).subscribe(params => {
      this._course = params['course'];
      this._courseId = +params['courseId'];
    });
    takeUntil.call(this.courses, this._destroy).subscribe(data => {
      this._courses = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course(): Course {
    return this._courses.find(a => {
      return a.name === this._course && (!this._courseId || this._courseId === a.id);
    });
  }
}
