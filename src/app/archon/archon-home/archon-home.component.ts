import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'vg-archon-home',
  templateUrl: './archon-home.component.html',
  styleUrls: ['./archon-home.component.scss']
})
export class ArchonHomeComponent implements OnInit {

  courses = this._userService.archon;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

}
