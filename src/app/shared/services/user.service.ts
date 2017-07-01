import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  utln: Observable<string>;
  isGrader: Observable<boolean>;
  isArchon: Observable<boolean>;
  grading: Observable<string[]>;
  archon: Observable<string[]>;
  courses: Observable<string[]>;

  private _utln: BehaviorSubject<string> = new BehaviorSubject('');
  private _isGrader: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _isArchon: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _grading: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _archon: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _courses: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    this.utln = this._utln.asObservable();
    this.isGrader = this._isGrader.asObservable();
    this.isArchon = this._isArchon.asObservable();
    this.grading = this._grading.asObservable();
    this.archon = this._archon.asObservable();
    this.courses = this._courses.asObservable();
  }

  public populate (data, utln) {
    if (utln !== this._utln.getValue()) {
      this._isGrader.next(data.grading.length !== 0);
      this._isArchon.next(data.archon.length !== 0);
      this._grading.next(data.grading);
      this._archon.next(data.archon);
      this._courses.next(data.courses);
      this._utln.next(data.user);
    }
  }
}
