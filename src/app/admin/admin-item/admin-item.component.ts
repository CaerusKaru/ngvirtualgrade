import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vg-archon-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})
export class AdminItemComponent implements OnInit {

  problems = [
    {
      name: 'Problem 1',
      progress: Math.random() * 100
    },
    {
      name: 'Problem 2',
      progress: Math.random() * 100
    },
    {
      name: 'Problem 3',
      progress: Math.random() * 100
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
