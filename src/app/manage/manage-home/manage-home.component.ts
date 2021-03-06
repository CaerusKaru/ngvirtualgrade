import { Component, OnInit } from '@angular/core';
import {UserService} from '@app/shared/services';

@Component({
  selector: 'vg-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.scss']
})
export class ManageHomeComponent implements OnInit {

  depts = this._userService.manage;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

}
