import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  utln: Observable<string>;
  isGrader: Observable<boolean>;
  isAdmin: Observable<boolean>;
  grading: Observable<string[]>;
  admin: Observable<string[]>;
  courses: Observable<string[]>;

  private _utln: BehaviorSubject<string> = new BehaviorSubject('');
  private _isGrader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _grading: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _admin: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _courses: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    this.utln = this._utln.asObservable();
    this.isGrader = this._isGrader.asObservable();
    this.isAdmin = this._isAdmin.asObservable();
    this.grading = this._grading.asObservable();
    this.admin = this._admin.asObservable();
    this.courses = this._courses.asObservable();
  }

  public populate (data, utln) {
    if (utln !== this._utln.getValue()) {
      this._isGrader.next(data.grading.length !== 0);
      this._isAdmin.next(data.admin.length !== 0);
      this._grading.next(data.grading);
      this._admin.next(data.admin);
      this._courses.next(data.courses);
      this._utln.next(data.user);
    }
  }

  public depopulate () {
    this._isGrader.next(false);
    this._isAdmin.next(false);
    this._grading.next([]);
    this._admin.next([]);
    this._courses.next([]);
    this._utln.next(null);
  }
}
