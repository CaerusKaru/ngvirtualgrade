import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UniqueSelectionDispatcher, MatDialog, MatDialogRef, MatSort, MatPaginator} from '@angular/material';
import {SvgService} from './svg/shared/svg.service';
import {ScoreItem} from '../shared/score-item';
import {Problem} from '../shared/problem';
import {NgForm} from '@angular/forms';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'vg-grading-item',
  templateUrl: './grading-item.component.html',
  styleUrls: ['./grading-item.component.scss'],
  providers: [UniqueSelectionDispatcher]
})
export class GradingItemComponent implements OnInit, OnDestroy {

  displayedColumns = ['userId', 'progress', 'userName', 'color'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  course;
  id;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  type = 'pdf';

  private _destroy = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    takeUntil.call(this._route.params, this._destroy).subscribe(params => {
      this.course = params['course'];
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
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

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): UserData[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
        case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

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
    public dialog: MatDialog
  ) {

  }

  ngOnInit () {
    takeUntil.call(this._svgService.mode, this._destroy).subscribe((newMode) => this._currentMode = newMode);
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
    takeUntil.call(dialogRef.afterClosed(), this._destroy).subscribe(result => {
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
    takeUntil.call(dialogRef.afterClosed(), this._destroy).subscribe(result => {
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
    public dialogRef: MatDialogRef<ScoringItemDialogComponent>
  ) { }

  closeDialog (f: NgForm) {
    this.dialogRef.close(f.value);
  }
}
