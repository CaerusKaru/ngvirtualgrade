import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubmissionStep} from '../../shared/classes/submission-step';
import {GradingComponent} from '../../shared/classes/grading-component';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Grader} from '../../shared/classes/grader';
import {Assignment} from '../../shared/classes/assignment';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {slideAnimation} from '../../shared/animations/slide.animation';

@Component({
  selector: 'vg-archon-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
  animations: [slideAnimation]
})
export class AdminCreateComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get steps(): FormArray {
    return this.createForm.get('steps') as FormArray;
  };

  get score(): number {
    return this.steps.controls.reduce((a: number, d) => {
      const comps = d.get('components') as FormArray;
      return a + comps.controls.reduce((b: number, e) => {
        return b + (e.get('is_extra_credit').value ? 0 : e.get('max_score').value);
      }, 0);
    }, 0)
  }

  addStep() {
    this.steps.push(this._setSteps());
  }

  addException(step) {
    step.get('exceptions').push(this._setException());
  }

  addComp(step) {
    step.get('components').push(this._setComps());
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
      description: '',
      steps: this._fb.array([this._setSteps()])
    });
  }

  private _setSteps() {
    return this._fb.group({
      name: [this.newStep, [Validators.required]],
      start_date: new FormControl({value: new Date(), disabled: false}, Validators.required),
      end_date: new FormControl(
        {
          value: new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)),
          disabled: false
        },
        Validators.required
      ),
      submission_type: '',
      new_file: '',
      files: this._fb.array([]),
      allow_other_files: new FormControl(false),
      components: this._fb.array([this._setComps()]),
      exceptions: this._fb.array([])
    })
  }

  private _setComps() {
    return this._fb.group({
      name: [this.newComp, [Validators.required]],
      max_score: [0, [Validators.min(0)]],
      is_extra_credit: new FormControl(false),
      new_file: '',
      new_grader: '',
      files: this._fb.array([]),
      graders: this._fb.array([]),
      due_date: new Date()
    });
  }

  private _setException() {
    return this._fb.group({
      user: ['', [Validators.required]],
      date: new Date(),
      reason: ''
    })
  }
}
