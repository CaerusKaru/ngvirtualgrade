import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'vg-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit, OnDestroy {

  courses = this._userService.admin;

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
