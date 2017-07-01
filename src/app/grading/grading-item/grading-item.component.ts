import { Component, OnInit } from '@angular/core';
import {UniqueSelectionDispatcher, MdDialog, MdDialogRef} from '@angular/material';
import {SvgService} from './svg/shared/svg.service';
import {ScoreItem} from '../shared/score-item';
import {Problem} from '../shared/problem';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'vg-grading-item',
  templateUrl: './grading-item.component.html',
  styleUrls: ['./grading-item.component.scss'],
  providers: [UniqueSelectionDispatcher]
})
export class GradingItemComponent implements OnInit {

  problems = [
    {
      name: 'Problem 1',
      progress: Math.random() * 100,
      series: [
        {
          'name': '2010',
          'value': 74
        },
        {
          'name': '2012',
          'value': 89
        }
      ]
    },
    {
      name: 'Problem 2',
      progress: Math.random() * 100,
      series: [
        {
          'name': '2010',
          'value': 52
        },
        {
          'name': '2011',
          'value': 66
        }
      ]
    },
    {
      name: 'Problem 3',
      progress: Math.random() * 100,
      series: [
        {
          'name': '2010',
          'value': 15
        },
        {
          'name': '2011',
          'value': 12
        }
      ]
    }
  ];

  // view: any[] = [700, 400];
  //
  // currentProblem;
  //
  // // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Num. students';
  // showYAxisLabel = true;
  // yAxisLabel = 'Score';
  //
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  //
  // // line, area
  // autoScale = true;

  type = 'pdf';

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {

  }

  onSelect(event) {
    console.log(event);
  }

  grade () {
    let comp;
    if (this.type === 'pdf') {
      comp = GradingItemPDFDialogComponent;
    }
    this.dialog.open(comp, {
      height: '100%',
      width: '100%'
    });
  }

}

@Component({
  selector: 'vg-grading-item-pdf-dialog',
  templateUrl: './grading-item-pdf-dialog.component.html',
  styleUrls: ['./grading-item-pdf-dialog.component.scss']
})
export class GradingItemPDFDialogComponent implements OnInit {

  adjust = 0;
  currentColor = '#000000';
  currentSize = 5;

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
    }
  };

  // assignment

  private _problem: Problem = {
    assignName: 'hw4',
    problemName: 'Problem 5',
    studentName: '1',
    maxScore: 100,
  };

  private _drawColor = '#000000';
  private _drawSize = 5;
  private _highlightColor = '#FFFF00';
  private _highlightSize = 15;
  private _doneStudents = 4;
  private _totalStudents = 6;
  private _numPages = 6;

  private _currentMode: string;
  private _fileExplorerOpen = false;
  private _sideNavOpen = true;

  private _scores: ScoreItem[] = [
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
      name: 'highlight',
      iconName: 'highlight',
      tooltip: 'Highlighter'
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
    }
  ];

  constructor (
    private _svgService: SvgService,
    public dialog: MdDialog
  ) {

  }

  ngOnInit () {
    this._svgService.mode.subscribe((newMode) => this._currentMode = newMode);
  }

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

  addScore () {
    const dialogRef = this.dialog.open(ScoringItemDialogComponent);
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

  selectProblem (i: number) {

  }

  pagesArray () {
    return new Array(this.numPages);
  }

  edit (item) {
    const idx = this._scores.indexOf(item);
    const dialogRef = this.dialog.open(ScoringItemDialogComponent);
    dialogRef.componentInstance.desc = item.comment;
    dialogRef.componentInstance.points = item.score;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._scores[idx].score = result.points;
        this._scores[idx].comment = result.desc;
      }
    });
  }

  score () {
    return this.scores.reduce(function (a, b) {
      return a + (b.selected ? b.score : 0);
    }, 0) + this.adjust;
  }

  toggleSideNav () {
    this._sideNavOpen = !this._sideNavOpen;
  }

  openFileExplorer () {
    this._fileExplorerOpen = !this._fileExplorerOpen;
  }

  closeFileExplorer () {
    this._fileExplorerOpen = false;
  }

  get modes () {
    return this._modes;
  }

  get sideNavOpen () {
    return this._sideNavOpen;
  }

  get fileExplorerOpen () {
    return this._fileExplorerOpen;
  }

  get currentMode () {
    return this._currentMode;
  }

  setMode (mode: string) {
    if (mode === 'highlight') {
      if (this._currentMode === 'draw') {
        this._drawColor = this.currentColor;
        this._drawSize = this.currentSize;
      }
      this.currentColor = this._highlightColor;
      this.currentSize = this._highlightSize;
    } else if (mode === 'draw') {
      if (this._currentMode === 'highlight') {
        this._highlightColor = this.currentColor;
        this._highlightSize = this.currentSize;
      }
      this.currentColor = this._drawColor;
      this.currentSize = this._drawSize;
    }

    this._svgService.setMode(mode);
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

  removePage () {

  }

  download () {

  }
}

@Component({
  selector: 'vg-scoring-item-dialog',
  templateUrl: './score-item-dialog.html',
  styles: []
})
export class ScoringItemDialogComponent {

  points: number;
  desc: string;

  constructor (
    public dialogRef: MdDialogRef<ScoringItemDialogComponent>
  ) { }

  closeDialog (f: NgForm) {
    this.dialogRef.close(f.value);
  }
}
