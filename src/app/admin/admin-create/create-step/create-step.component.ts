import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {hideAnimation, slideChildAnimation} from '../../../shared/animations/slide.animation';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operator/takeUntil';

@Component({
  selector: 'vg-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.scss'],
  animations: [slideChildAnimation, hideAnimation]
})
export class CreateStepComponent implements OnInit, OnDestroy {

  @Input() step: FormGroup;
  @Output() remove = new EventEmitter();
  @Output() add = new EventEmitter();

  show = true;
  minDate = new Date();
  startTime = new FormControl(('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));
  endTime = new FormControl(('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));

  private _destroy = new Subject();

  constructor() { }

  ngOnInit() {
    takeUntil.call(this.startTime.valueChanges, this._destroy).subscribe(
      data => {
        const curStart = this.step.get('start_date').value;
        const newTime = data.split(':');
        curStart.setHours(newTime[0]);
        curStart.setMinutes(newTime[1]);
        this.step.get('start_date').setValue(curStart);
      }
    );
    takeUntil.call(this.endTime.valueChanges, this._destroy).subscribe(
      data => {
        const curStart = this.step.get('end_date').value;
        const newTime = data.split(':');
        curStart.setHours(newTime[0]);
        curStart.setMinutes(newTime[1]);
        this.step.get('end_date').setValue(curStart);
      }
    );
    takeUntil.call(this.step.get('start_date').valueChanges, this._destroy)
      .filter(v => v.getHours() !== +this.startTime.value.split(':')[0] && v.getMinutes() !== +this.startTime.value.split(':')[1])
      .subscribe(
      data => {
        const newTime = this.startTime.value.split(':');
        data.setHours(newTime[0]);
        data.setMinutes(newTime[1]);
        this.step.get('start_date').setValue(data);
      }
    );
    takeUntil.call(this.step.get('end_date').valueChanges, this._destroy)
      .filter(v => v.getHours() !== +this.endTime.value.split(':')[0] && v.getMinutes() !== +this.endTime.value.split(':')[1])
      .subscribe(
        data => {
          const newTime = this.endTime.value.split(':');
          data.setHours(newTime[0]);
          data.setMinutes(newTime[1]);
          this.step.get('end_date').setValue(data);
        }
      );
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get score(): number {
    const comps = this.step.get('components') as FormArray;
    return comps.controls.reduce((b: number, e) => {
      return b + (e.get('is_extra_credit').value ? 0 : e.get('max_score').value);
    }, 0);
  }

  removeStep() {
    this.remove.emit();
  }

  addComp() {
    this.add.emit();
  }

  removeComp(step, index) {
    step.get('components').removeAt(index);
  }
}
