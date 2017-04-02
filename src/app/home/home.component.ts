import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {MenuService} from "../menu/shared/menu.service";
import {Location} from "@angular/common";
import {AuthService} from "../shared/auth.service";

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

  private changeTab() {
    let findTab = (nav) => {
      return this.location.path().indexOf(nav.route) !== -1;
    };

    this.activeLinkIndex =
      this.navLinks.indexOf(this.navLinks.find(findTab));
  }
}
