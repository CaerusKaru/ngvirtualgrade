import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {hideAnimation, slideChildAnimation} from '../../../shared/animations/slide.animation';

@Component({
  selector: 'vg-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.scss'],
  animations: [slideChildAnimation, hideAnimation]
})
export class CreateStepComponent implements OnInit {

  @Input() step: FormGroup;
  @Output() remove = new EventEmitter();
  @Output() add = new EventEmitter();

  show = true;

  constructor() { }

  ngOnInit() {
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
