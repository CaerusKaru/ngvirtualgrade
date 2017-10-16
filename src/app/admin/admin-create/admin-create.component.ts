import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'vg-archon-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
})
export class AdminCreateComponent {

  createMode: string;
  createForm: FormGroup;
  newStep = 'New Step';

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
  ) {
    this.createMode = this._route.snapshot.params['type'];
    this._createForm();
  }

  get steps(): FormArray {
    return this.createForm.get('steps') as FormArray;
  };

  addStep() {
    this.steps.push(this._setSteps());
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

  removeStep(index) {
    this.steps.removeAt(index);
  }

  private _createForm() {
    this.createForm = this._fb.group({
      name: [null, [Validators.required]],
      description: null,
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
      submission_type: null,
      files: this._fb.array([]),
      allow_other_files: new FormControl(false),
      components: this._fb.array([]),
      exceptions: this._fb.array([])
    }, { updateOn: 'submit' })
  }
}
