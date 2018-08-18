import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import {SvgService} from './svg/shared/svg.service';
import {Problem} from '../shared/problem';
import {NgForm} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SelectionModel, UniqueSelectionDispatcher} from '@angular/cdk/collections';
import {ScoreItem} from '@app/grading/shared';
import {UserService} from '@app/shared/services';
import {Directionality} from '@angular/cdk/bidi';

@Component({
  selector: 'vg-grading-item',
  templateUrl: './grading-item.component.html',
  styleUrls: ['./grading-item.component.scss'],
  providers: [UniqueSelectionDispatcher]
})
export class GradingItemComponent implements OnInit, OnDestroy {

  // displayedColumns = ['userId', 'progress', 'userName', 'color'];
  displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  courses = this._userService.grading;

  course;
  id;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  type = 'pdf';

  private _destroy = new Subject<void>();
  private _courses = [];

  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._route.params.pipe(takeUntil(this._destroy)).subscribe(params => {
      this.course = params['course'];
      this.id = params['id'];
    });
    this.courses.pipe(takeUntil(this._destroy)).subscribe(data => {
      this._courses = data;
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get name() {
    return this._courses.find(a => {
      return this.course === a.id;
    }).assignments.find(a => a.id === this.id).name;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSelect(event) {
    console.log(event);
  }

  grade() {
    let comp;
    if (this.type === 'pdf') {
      comp = GradingItemPDFDialogComponent;
    }
    this.dialog.open(comp, {
      maxHeight: '100%',
      maxWidth: '100%',
      height: '100%',
      width: '100%',
      direction: 'ltr'
    });
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
  selector: 'vg-grading-item-pdf-dialog',
  templateUrl: './grading-item-pdf-dialog.component.html',
  styleUrls: ['./grading-item-pdf-dialog.component.scss']
})
export class GradingItemPDFDialogComponent implements OnInit, OnDestroy {

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

  private _destroy = new Subject<void>();

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
    public dialog: MatDialog,
  ) {
  }

  ngOnInit () {
    this._svgService.mode.pipe(takeUntil(this._destroy)).subscribe((newMode) => this._currentMode = newMode);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
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
    dialogRef.afterClosed().pipe(takeUntil(this._destroy)).subscribe(result => {
      if (result) {
        this._scores.push({
          score: parseFloat(result.points),
          comment: result.desc,
          selected: true
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
    dialogRef.afterClosed().pipe(takeUntil(this._destroy)).subscribe(result => {
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

  get modes () {
    return this._modes;
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
    public dialogRef: MatDialogRef<ScoringItemDialogComponent>
  ) { }

  closeDialog (f: NgForm) {
    this.dialogRef.close(f.value);
  }
}
