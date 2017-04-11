import { Component, OnInit } from '@angular/core';
import {UniqueSelectionDispatcher, MdDialog, MdDialogRef} from "@angular/material";
import {SvgService} from "./svg/shared/svg.service";
import {ScoreItem} from "../shared/score-item";
import {Problem} from "../shared/problem";
import {NgForm} from "@angular/forms";

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
  styleUrls: ['./grading-item-pdf-dialog.component.scss']
})
export class GradingItemPDFDialog implements OnInit {
  constructor (
    private svgService : SvgService,
    public dialog : MdDialog
  ) {

  }

  ngOnInit () {
    this.svgService.mode.subscribe((newMode) => this._currentMode = newMode);
  }


  public adjust : number = 0;
  public currentColor : string = '#000000';
  public currentSize : number = 5;

  get assign () {
    return this._problem.assignName;
  }

  get problem () {
    return this._problem.problemName;
  }

  get student () {
    return this._problem.studentName;
  }

  get doneStudents () {
    return this._doneStudents;
  }

  get totalStudents () {
    return this._totalStudents;
  }

  get numPages () {
    return this._numPages;
  }

  get max () {
    return this._problem.maxScore;
  }

  get scores () {
    return this._scores;
  }

  get studentName () {
    return this._problem.studentName;
  }

  public addScore () {
    let dialogRef = this.dialog.open(ScoringItemDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._scores.push({
          score: parseFloat(result.points),
          comment: result.desc,
          selected: false
        });
      }
    });
  }

  public selectProblem (i : number) {

  }

  public pagesArray () {
    return new Array(this.numPages);
  }

  public edit (item) {
    let idx = this._scores.indexOf(item);
    let dialogRef = this.dialog.open(ScoringItemDialog);
    dialogRef.componentInstance.desc = item.comment;
    dialogRef.componentInstance.points = item.score;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._scores[idx].score = result.points;
        this._scores[idx].comment = result.desc;
      }
    });
  }

  public score () {
    return this.scores.reduce(function (a, b) {
      return a + (b.selected ? b.score : 0);
    }, 0) + this.adjust;
  }

  public toggleSideNav () {
    this._sideNavOpen = !this._sideNavOpen;
  }

  get modes () {
    return this._modes;
  }

  get sideNavOpen () {
    return this._sideNavOpen;
  }

  get currentMode () {
    return this._currentMode;
  }

  public setMode (mode : string) {
    this.svgService.setMode(mode);
  }

  public backPage () {

  }

  public attachPage () {

  }

  public addPage () {

  }

  public redo () {

  }

  public undo () {

  }

  public clear () {

  }

  public removePage () {

  }

  public PDF = {
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
    }
  };

  // assignment

  private _problem : Problem = {
    assignName: "hw4",
    problemName: "Problem 5",
    studentName: "wiedjiw",
    maxScore: 100,
  };

  private _doneStudents : number = 4;
  private _totalStudents : number = 6;
  private _numPages: number = 6;

  private _currentMode : string;
  private _sideNavOpen : boolean = true;

  private _scores : ScoreItem[] = [
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

  private _modes = [
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
}

@Component({
  selector: 'app-scoring-item-dialog',
  templateUrl: './score-item-dialog.html',
  styles: []
})
export class ScoringItemDialog {

  constructor (
    public dialogRef : MdDialogRef<ScoringItemDialog>
  ) {
  }

  public points : number;
  public desc : string;

  closeDialog (f: NgForm) {
    this.dialogRef.close(f.value);
  }
}
