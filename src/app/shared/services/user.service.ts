import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Course, Department} from '@app/shared/classes';

export enum ManagePerms {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

@Injectable()
export class UserService {

  utln: Observable<string>;
  term: Observable<string>;
  grading: Observable<Course[]>;
  admin: Observable<Course[]>;
  courses: Observable<Course[]>;
  manage: Observable<Department[]>;
  managePerms: Observable<ManagePerms[]>;


  private _utln: BehaviorSubject<string> = new BehaviorSubject(null);
  private _term: BehaviorSubject<string> = new BehaviorSubject(null);
  private _grading: BehaviorSubject<Course[]> = new BehaviorSubject([]);
  private _admin: BehaviorSubject<Course[]> = new BehaviorSubject([]);
  private _courses: BehaviorSubject<Course[]> = new BehaviorSubject([]);
  private _manage: BehaviorSubject<Department[]> = new BehaviorSubject([]);
  private _managePerms: BehaviorSubject<ManagePerms[]> = new BehaviorSubject([]);

  constructor() {
    this.utln = this._utln.asObservable();
    this.grading = this._grading.asObservable();
    this.admin = this._admin.asObservable();
    this.courses = this._courses.asObservable();
    this.manage = this._manage.asObservable();
    this.managePerms = this._managePerms.asObservable();
    this.term = this._term.asObservable();
  }

  populate (data, utln) {
    if (utln !== this._utln.getValue()) {
      this._grading.next(data.grading);
      this._admin.next(data.admin);
      this._courses.next(data.courses);
      this._utln.next(data.username);
      this._manage.next(data.manage.departments);
      this._managePerms.next(data.manage.privileges);
      this._term.next(data.term);
    }
  }

  depopulate () {
    this._grading.next([]);
    this._admin.next([]);
    this._courses.next([]);
    this._utln.next(null);
    this._manage.next([]);
    this._managePerms.next([]);
    this._term.next(null);
  }

  isTerm (v) {
    return v === this._term.getValue();
  }
}
