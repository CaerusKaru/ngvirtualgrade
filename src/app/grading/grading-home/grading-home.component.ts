import { Component, OnInit } from '@angular/core';
import {UserService} from '@app/shared/services';

@Component({
  selector: 'vg-grading-home',
  templateUrl: './grading-home.component.html',
  styleUrls: ['./grading-home.component.scss']
})
export class GradingHomeComponent implements OnInit {

  courses = this._userService.grading;

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit() {
  }

}
