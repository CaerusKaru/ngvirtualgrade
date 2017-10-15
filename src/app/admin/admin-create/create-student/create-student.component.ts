import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {slideAnimation} from '../../../shared/animations/slide.animation';

@Component({
  selector: 'vg-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  animations: [slideAnimation]
})
export class CreateStudentComponent implements OnInit, OnDestroy {

  newStep = 'New Step';
  newComp = 'New Component';
  course: string;

  createForm: FormGroup;
  activeTabIndex = 0;

  private _destroy = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._createForm();
  }

  ngOnInit() {
    this._route.params.pipe(takeUntil(this._destroy)).subscribe(params => {
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

  addStep() {
    this.steps.push(this._setSteps());
    this.activeTabIndex = this.steps.length - 1;
  }

  addException(step) {
    step.get('exceptions').push(this._setException());
  }

  removeStep() {
    this.steps.removeAt(this.activeTabIndex);
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
      name: new FormControl(this.newStep, {validators: [Validators.required], updateOn: 'blur'}),
      start_date: new FormControl({value: new Date(), disabled: false}, Validators.required),
      end_date: new FormControl(
        {
          value: new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)),
          disabled: false
        },
        Validators.required
      ),
      submission_type: '',
      files: this._fb.array([]),
      allow_other_files: new FormControl(false),
      components: this._fb.array([this._setComps()]),
      exceptions: this._fb.array([])
    }, { updateOn: 'blur' })
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
