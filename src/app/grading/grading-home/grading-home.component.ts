import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';

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
