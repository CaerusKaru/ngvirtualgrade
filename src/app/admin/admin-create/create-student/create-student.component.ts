import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {slideAnimation} from '@app/shared/animations';

@Component({
  selector: 'vg-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  animations: [slideAnimation]
})
export class CreateStudentComponent implements OnInit {

  newComp = 'New Component';
  course: string;

  activeTabIndex = 0;

  @Input() steps: FormArray;
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<number>();

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.course = this._route.snapshot.params['course'];
  }

  addStep() {
    this.add.emit();
    this.activeTabIndex = this.steps.length - 1;
  }

  addException(step) {
    step.get('exceptions').push(this._setException());
  }

  removeStep() {
    this.remove.emit(this.activeTabIndex);
  }

  private _setComps() {
    return this._fb.group({
      name: [this.newComp, [Validators.required]],
      max_score: [0, [Validators.min(0)]],
      is_extra_credit: new FormControl(false),
      files: this._fb.array([]),
      graders: this._fb.array([]),
      due_date: new Date()
    });
  }

  private _setException() {
    return this._fb.group({
      user: [null, [Validators.required]],
      date: new Date(),
      reason: null
    })
  }
}
