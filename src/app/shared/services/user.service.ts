import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  utln: Observable<string>;
  grading: Observable<string[]>;
  admin: Observable<string[]>;
  courses: Observable<string[]>;
  inactive: Observable<string[]>;

  private _utln: BehaviorSubject<string> = new BehaviorSubject('');
  private _grading: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _admin: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _courses: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _inactive: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    this.utln = this._utln.asObservable();
    this.grading = this._grading.asObservable();
    this.admin = this._admin.asObservable();
    this.courses = this._courses.asObservable();
    this.inactive = this._inactive.asObservable();
  }

  public populate (data, utln) {
    if (utln !== this._utln.getValue()) {
      this._grading.next(data.grading);
      this._admin.next(data.admin);
      this._courses.next(data.courses);
      this._inactive.next(data.inactive);
      this._utln.next(data.user);
    }
  }

  public depopulate () {
    this._grading.next([]);
    this._admin.next([]);
    this._courses.next([]);
    this._inactive.next([]);
    this._utln.next(null);
  }
}
