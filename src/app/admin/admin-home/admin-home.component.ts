import { Component, OnInit } from '@angular/core';
import {UserService} from '@app/shared/services';

@Component({
  selector: 'vg-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  courses = this._userService.admin;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

}
