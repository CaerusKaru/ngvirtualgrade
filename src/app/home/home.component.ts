import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
<<<<<<< Updated upstream
import {UserService} from "../shared/user.service";
import {MenuService} from "../menu/shared/menu.service";
=======
import {UserService} from "../shared/services/user.service";
>>>>>>> Stashed changes
import {Location} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService,
    private menuService: MenuService,
    private authService: AuthService
  ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.changeTab());
    this._grading = this.userService.grading;
    this._archon = this.userService.archon;
    this._grades = this.userService.courses;
  }

  ngOnInit () {
    if (!this._initTabs) {
      this._initTabs = true;
      this.userService.isArchon.subscribe(data => {
        this.isArchon = data;
        if (!this.isArchon) {
          this.navLinks.splice(this.navLinks.indexOf(this.archonTab), 1);
        }
      });
      this.userService.isGrader.subscribe(data => {
        this.isGrader = data;
        if (!this.isGrader) {
          this.navLinks.splice(this.navLinks.indexOf(this.graderTab), 1);
        }
      });
      this.userService.utln.subscribe(data => {
        this.utln = data;
      });
    }
  }

  public mode : string;
  public courses : Observable<string[]>;
  public activeLinkIndex = -1;
  public archonTab = {route: '/archon', label: 'Archon'};
  public graderTab = {route: '/grading', label: 'Grading'};

  public navLinks = [
    {route: '/grades', label: 'Grades'},
    this.graderTab,
    this.archonTab
  ];

  public utln : string;
  public isArchon : boolean;
  public isGrader : boolean;

  public isSectionSelected (section) {
    return this.menuService.isSectionSelected(section);
  }

  public getSections () {
    return this.menuService.sections;
  }

  public isHeading (section) {
    return section.type === 'heading';
  }

  public isLink (section) {
    return section.type === 'link';
  }

  public isToggle (section) {
    return section.type === 'toggle';
  }

  public isOpen() {
    return true;
  }

  public logOut() {
    this.authService.logout();
  }

  private _initTabs = false;
  private _grades : Observable<string[]>;
  private _grading : Observable<string[]>;
  private _archon : Observable<string[]>;

  private changeTab() {
    let findTab = (nav) => {
      return this.location.path().indexOf(nav.route) !== -1;
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
