import { Component, OnInit } from '@angular/core';
import {UniqueSelectionDispatcher, MdDialog} from "@angular/material";

@Component({
  selector: 'app-grading-item',
  templateUrl: './grading-item.component.html',
  styleUrls: ['./grading-item.component.scss'],
  providers: [UniqueSelectionDispatcher]
})
export class GradingItemComponent implements OnInit {

  problems = [
    {
      name: '1',
      series: [
        {
          "name": "2010",
          "value": 74
        },
        {
          "name": "2012",
          "value": 89
        }
      ]
    },
    {
      name: "2",
      series: [
        {
          "name": "2010",
          "value": 52
        },
        {
          "name": "2011",
          "value": 66
        }
      ]
    },
    {
      name: "3",
      series: [
        {
          "name": "2010",
          "value": 15
        },
        {
          "name": "2011",
          "value": 12
        }
      ]
    }
  ];

  view: any[] = [700, 400];

  currentProblem;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Num. students';
  showYAxisLabel = true;
  yAxisLabel = 'Score';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  type = "pdf";

  constructor(public dialog : MdDialog) {
  }

  ngOnInit() {

  }

  onSelect(event) {
    console.log(event);
  }

  grade () {
    let comp;
    if (this.type === 'pdf') {
      comp = GradingItemPDFDialog;
    }
    this.dialog.open(comp, {
      height: '100%',
      width: '100%'
    });
  }

}

@Component({
  selector: 'app-grading-item-pdf-dialog',
  templateUrl: './grading-item-pdf-dialog.component.html',
  styleUrls: ['./grading-item-pdf-dialog.component.scss'],
})
export class GradingItemPDFDialog {
  constructor () {

  }

  currentColor : string = '#000000';
  currentSize : number = 5;
  currentMode : string = 'draw';

  doneStudents : number = 4;
  totalStudents : number = 6;
  adjust : number = 0;
  selected = [];

  assign : string = "hw4";
  page : number = 5;
  numStudent : number = 4;
  numPages : number = 6;
  currentScore : number = 100;
  max : number = 100;
  min : number = 0;

  scores = [
    {
      score: 3,
      comment: 'Did everything correctly',
      selected: false
    },
    {
      score: 2,
      comment: 'Correct NFA construction',
      selected: false
    }
  ];

  setScore (max : boolean) {
    if (max) {
      this.currentScore = this.max;
    } else {
      this.currentScore = this.min;
    }
  }

  selectProblem (i : number) {

  }

  pagesArray () {
    return new Array(this.numPages);
  }

  edit (item) {
    console.log(item);
  }

  score () {
    return this.scores.reduce(function (a, b) {
      return a + (b.selected ? b.score : 0);
    }, 0) + this.adjust;
  }

  modes = [
    {
      name: 'draw',
      iconName: 'mode_edit',
      tooltip: 'Draw'
    },
    {
      name: 'text',
      iconName: 'format_color_text',
      tooltip: 'Text'
    },
    {
      name: 'drag',
      iconName: 'pan_tool',
      tooltip: 'Drag'
    },
    {
      name: 'select',
      iconName: 'touch_app',
      tooltip: 'Select'
    },
  ];

  setMode (mode : string) {
    this.currentMode = mode;
  }

  backPage () {

  }

  attachPage () {

  }

  addPage () {

  }

  redo () {

  }

  undo () {

  }

  clear () {

  }

  PDF = {
    pages: [{
      removeable: false
    }],
    currentPage: () => {
      return 0;
    },
    numPages: () => {
      return 1;
    },
    getCurrentPage: () => {
      return {
        addedStack: [],
        undoStack: []
      };
    },

  };

  sideNavOpen : boolean = true;

  removePage () {

  }
}
