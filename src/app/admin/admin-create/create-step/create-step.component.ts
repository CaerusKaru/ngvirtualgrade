import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {filter} from 'rxjs/operators/filter';
import {ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

const COMMA = 188;

@Component({
  selector: 'vg-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.scss']
})
export class CreateStepComponent implements OnInit, OnDestroy {

  @Input() step: FormGroup;

  minDate = new Date();
  startTime = new FormControl(('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));
  endTime = new FormControl(('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));

  separatorKeysCodes = [ENTER, COMMA];

  private _destroy = new Subject();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.startTime.valueChanges.pipe(takeUntil(this._destroy)).subscribe(
      data => {
        const curStart = this.step.get('start_date').value;
        const newTime = data.split(':');
        curStart.setHours(newTime[0]);
        curStart.setMinutes(newTime[1]);
        this.step.get('start_date').setValue(curStart);
      }
    );
    this.endTime.valueChanges.pipe(takeUntil(this._destroy)).subscribe(
      data => {
        const curStart = this.step.get('end_date').value;
        const newTime = data.split(':');
        curStart.setHours(newTime[0]);
        curStart.setMinutes(newTime[1]);
        this.step.get('end_date').setValue(curStart);
      }
    );
    this.step.get('start_date').valueChanges.pipe(
      takeUntil(this._destroy),
      filter(v => v.getHours() !== +this.startTime.value.split(':')[0] && v.getMinutes() !== +this.startTime.value.split(':')[1])
    ).subscribe(
    data => {
      const newTime = this.startTime.value.split(':');
      data.setHours(newTime[0]);
      data.setMinutes(newTime[1]);
      this.step.get('start_date').setValue(data);
    });
    this.step.get('end_date').valueChanges.pipe(
      takeUntil(this._destroy),
      filter(v => v.getHours() !== +this.endTime.value.split(':')[0] && v.getMinutes() !== +this.endTime.value.split(':')[1])
    ).subscribe(
      data => {
      const newTime = this.endTime.value.split(':');
      data.setHours(newTime[0]);
      data.setMinutes(newTime[1]);
      this.step.get('end_date').setValue(data);
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get files(): FormArray {
    return this.step.get('files') as FormArray;
  }

  addFile(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.files.push(this._fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeFile(index: number): void {
    if (index >= 0) {
      this.files.removeAt(index);
    }
  }
}
