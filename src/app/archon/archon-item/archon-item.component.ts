import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vg-archon-item',
  templateUrl: './archon-item.component.html',
  styleUrls: ['./archon-item.component.scss']
})
export class ArchonItemComponent implements OnInit {

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
