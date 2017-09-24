import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {Course} from '../../shared/classes/course';
import {map} from 'rxjs/operator/map';
import { FileUploader } from 'ng2-file-upload';
import {MatDialog, MatDialogRef} from '@angular/material';

const URL = '/submissions/';

@Component({
  selector: 'vg-courses-course',
  templateUrl: './courses-course.component.html',
  styleUrls: ['./courses-course.component.scss']
})
export class CoursesCourseComponent implements OnInit, OnDestroy {

  courses = map.call(this._userService.courses, v => v.filter(a => this._userService.isTerm(a.term)));
  inactive = map.call(this._userService.courses, v => v.filter(a => !this._userService.isTerm(a.term)));

  private _course: string;
  private _courseId: number;
  private _courses = [];
  private _inactive = [];
  private _destroy = new Subject<void>();

  constructor(
    public dialog: MatDialog,
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
    takeUntil.call(this.inactive, this._destroy).subscribe(data => {
      this._inactive = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get course(): Course {
    return this._courses.find(a => {
        return a.name === this._course && (!this._courseId || this._courseId === a.id);
      }) ||
      this._inactive.find(a => {
        return a.name === this._course && (!this._courseId || this._courseId === a.id);
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

  uploader = new FileUploader({url: URL});

  constructor (public dialogRef: MatDialogRef<SubmitAssignmentDialogComponent>) {
  }

  addFile () {
    this.inputRef.nativeElement.click();
  }
}
