import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'vg-archon-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
})
export class AdminCreateComponent {

  createMode: string;

  constructor(
    private _route: ActivatedRoute,
  ) {
    this.createMode = this._route.snapshot.params['type'];
  }
}
