import { Component, OnInit } from '@angular/core';
import {SubmissionStep} from '../../shared/classes/submission-step';
import {GradingComponent} from '../../shared/classes/grading-component';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Grader} from '../../shared/classes/grader';

@Component({
  selector: 'vg-archon-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent implements OnInit {

  steps = [];
  newStep: string;
  newFile: string;
  newGrader: string;

  course: string;

  private _destroy = new Subject<void>();

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    takeUntil.call(this._route.params, this._destroy).subscribe(params => {
      this.course = params['course'];
    });
  }

  addStep() {
    const step = new SubmissionStep();
    step.name = this.newStep;
    step.components = [];
    step.end_date = new Date();
    step.start_date = new Date();
    step.allow_other_files = false;
    step.files = [];
    this.steps.push(step);
  }

  addComp(step, newComp) {
    const comp = new GradingComponent();
    comp.name = newComp;
    comp.files = [];
    comp.graders = [];
    comp.is_extra_credit = false;
    comp.max_score = 0;
    step.components.push(comp);
  }

  addFile(comp) {
    comp.files.push(this.newFile);
  }

  addGrader(comp) {
    const grader = new Grader();
    grader.user = this.newGrader;
    comp.graders.push(grader);
  }

  removeComp(step, index) {
    step.components.splice(index, 1);
  }

  removeStep(index) {
    this.steps.splice(index, 1);
  }
}
