import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vg-grades-item',
  templateUrl: './grades-item.component.html',
  styleUrls: ['./grades-item.component.scss']
})
export class GradesItemComponent implements OnInit {

  multi = true;
  hideToggle = false;
  showPanel3 = true;
  displayMode = false;
  msg = 'Click me!';

  constructor() { }

  ngOnInit() {
  }
}
