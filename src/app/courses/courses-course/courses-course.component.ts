import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil, map} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserService} from '@app/shared/services';
import {Course} from '@app/shared/classes';

const URL = '/submissions/';

@Component({
  selector: 'vg-courses-course',
  templateUrl: './courses-course.component.html',
  styleUrls: ['./courses-course.component.scss']
})
export class CoursesCourseComponent implements OnInit, OnDestroy {

  courses = this._userService.courses.pipe(map(v => v.filter(a => this._userService.isTerm(a.term))));
  inactive = this._userService.courses.pipe(map(v => v.filter(a => !this._userService.isTerm(a.term))));

  private _course: string;
  private _courses = [];
  private _inactive = [];
  private _destroy = new Subject<void>();

  constructor(
    public dialog: MatDialog,
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
    this.inactive.pipe(takeUntil(this._destroy)).subscribe(data => {
      this._inactive = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course(): Course {
    return this._courses.find(a => {
        return this._course === a.id;
      }) ||
      this._inactive.find(a => {
        return this._course === a.id;
      });
  }

  openSubmit () {
    const dialogRef = this.dialog.open(SubmitAssignmentDialogComponent, {
      height: '500px',
      width: '350px',
    });
  }
}

@Component({
  selector: 'vg-submit-assignment-dialog',
  templateUrl: './submit-assignment.dialog.html',
  styleUrls: ['./submit-assignment.dialog.scss']
})
export class SubmitAssignmentDialogComponent {

  @ViewChild('fileInput') inputRef: ElementRef;

  constructor (public dialogRef: MatDialogRef<SubmitAssignmentDialogComponent>) {
  }

  addFile () {
    this.inputRef.nativeElement.click();
  }
}
