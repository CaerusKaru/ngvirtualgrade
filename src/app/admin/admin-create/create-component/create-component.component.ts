import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {hideAnimation} from '../../../shared/animations/slide.animation';

@Component({
  selector: 'vg-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss'],
  animations: [hideAnimation]
})
export class CreateComponentComponent implements OnInit {

  @Input() comp: FormGroup;
  @Output() remove = new EventEmitter();

  show = true;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

  addFile(group) {
    group.get('files').push(this._fb.control(group.get('new_file').value));
  }

  addGrader(group) {
    group.get('graders').push(this._fb.control(group.get('new_grader').value));
  }

  removeFile(step, index) {
    step.get('files').removeAt(index);
  }

  removeGrader(step, index) {
    step.get('graders').removeAt(index);
  }

  removeComp() {
    this.remove.emit();
  }
}
