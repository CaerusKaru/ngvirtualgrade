import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades-item',
  templateUrl: './grades-item.component.html',
  styleUrls: ['./grades-item.component.scss']
})
export class GradesItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  msg : string = "Click me!";
  disabled : boolean = false;
}
