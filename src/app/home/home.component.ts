import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'vg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  mode: string;
  courses: Observable<string[]>;
  activeLinkIndex = -1;
  archonTab = {route: '/archon', label: 'Archon'};
  graderTab = {route: '/grading', label: 'Grading'};

  navLinks = [
    {route: '/grades', label: 'Grades'},
    this.graderTab,
    this.archonTab
  ];

  utln: string;
  isArchon: boolean;
  isGrader: boolean;

  private _initTabs = false;
  private _grades: Observable<string[]>;
  private _grading: Observable<string[]>;
  private _archon: Observable<string[]>;

  constructor(
    private _router: Router,
    private _location: Location,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.changeTab());
    this._grading = this._userService.grading;
    this._archon = this._userService.archon;
    this._grades = this._userService.courses;
  }

  ngOnInit () {
    if (!this._initTabs) {
      this._initTabs = true;
      this._userService.isArchon.subscribe(data => {
        this.isArchon = data;
        if (!this.isArchon) {
          this.navLinks.splice(this.navLinks.indexOf(this.archonTab), 1);
        }
      });
      this._userService.isGrader.subscribe(data => {
        this.isGrader = data;
        if (!this.isGrader) {
          this.navLinks.splice(this.navLinks.indexOf(this.graderTab), 1);
        }
      });
      this._userService.utln.subscribe(data => {
        this.utln = data;
      });
    }
  }

  isOpen() {
    return true;
  }

  logOut() {
    this._authService.logout();
  }

  private changeTab() {
    const findTab = (nav) => {
      return this._location.path().indexOf(nav.route) !== -1;
    };

    this.activeLinkIndex =
      this.navLinks.indexOf(this.navLinks.find(findTab));
    this.mode = this.navLinks[this.activeLinkIndex].route;
    if (this.mode === '/archon') {
      this.courses = this._archon;
    } else if (this.mode === '/grading') {
      this.courses = this._grading;
    } else {
      this.courses = this._grades;
    }
  }
}
