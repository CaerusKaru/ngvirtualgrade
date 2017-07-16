import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vg-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent implements OnInit {

  multi = true;
  hideToggle = false;
  showPanel3 = true;
  displayMode = false;
  msg = 'Click me!';

  constructor() { }

  ngOnInit() {
  }
}
