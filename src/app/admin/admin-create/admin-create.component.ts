import { Component, OnInit } from '@angular/core';
import {SubmissionStep} from '../../shared/classes/submission-step';
import {GradingComponent} from '../../shared/classes/grading-component';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Grader} from '../../shared/classes/grader';
import {Assignment} from '../../shared/classes/assignment';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'vg-archon-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent implements OnInit {

  newStep = 'New Step';
  newComp = 'New Component';
  course: string;

  createForm: FormGroup;

  private _destroy = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._createForm();
  }

  ngOnInit() {
    takeUntil.call(this._route.params, this._destroy).subscribe(params => {
      this.course = params['course'];
    });
  }

  get steps(): FormArray {
    return this.createForm.get('steps') as FormArray;
  };

  addStep() {
    this.steps.push(this._setSteps());
  }

  addComp(step) {
    step.get('components').push(this._setComps());
  }

  addFile(group) {
    group.get('files').push(this._fb.control(group.get('new_file').value));
  }

  addGrader(group) {
    group.get('graders').push(this._fb.control(group.get('new_grader').value));
  }

  removeComp(step, index) {
    step.get('components').removeAt(index);
  }

  removeStep(index) {
    this.steps.removeAt(index);
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

  private _createForm() {
    this.createForm = this._fb.group({
      name: ['', [Validators.required]],
      steps: this._fb.array([])
    });
  }

  private _setSteps() {
    return this._fb.group({
      name: [this.newStep, [Validators.required]],
      start_date: new Date(),
      end_date: new Date(),
      submission_type: '',
      new_file: '',
      files: this._fb.array([]),
      allow_other_files: false,
      components: this._fb.array([])
    })
  }

  private _setComps() {
    return this._fb.group({
      name: [this.newComp, [Validators.required]],
      max_score: [0, [Validators.min(0)]],
      is_extra_credit: false,
      new_file: '',
      new_grader: '',
      files: this._fb.array([]),
      graders: this._fb.array([])
    });
  }
}
