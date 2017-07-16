import {Component, OnInit} from '@angular/core';
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
  tabIndex = 0;

  createForm: FormGroup;

  private _destroy = new Subject<void>();
  private _currentIndex: number;

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

  get comps(): FormArray {
    if (this.currentStep === null) {
      return null;
    }
    return this.currentStep.get('components') as FormArray;
  }

  get currentStep(): FormGroup {
    return this.steps.at(this._currentIndex) as FormGroup;
  }

  get files(): FormArray {
    if (this.currentStep === null) {
      return null;
    }
    return this.currentStep.get('files') as FormArray;
  }

  addStep() {
    this.steps.push(this._setSteps());
    this.tabIndex = 0;
    this._currentIndex = this.steps.length - 1;
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
    if (this._currentIndex >= this.steps.length) {
      this._currentIndex = this.steps.length - 1;
    }
    this.tabIndex = 0;
  }

  removeFile(step, index) {
    step.get('files').removeAt(index);
  }

  removeGrader(step, index) {
    step.get('graders').removeAt(index);
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

  select(index) {
    this.tabIndex = 0;
    this._currentIndex = index;
  }

  private _createForm() {
    this.createForm = this._fb.group({
      name: ['', [Validators.required]],
      steps: this._fb.array([this._setSteps()])
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
      components: this._fb.array([this._setComps()])
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
