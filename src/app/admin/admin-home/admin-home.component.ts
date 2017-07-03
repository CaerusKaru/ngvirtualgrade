import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'vg-archon-home',
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
