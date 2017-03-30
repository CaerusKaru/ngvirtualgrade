import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {UserService} from "./user.service";
import {MenuService} from "./menu/shared/menu.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  activeLinkIndex = 0;

  navLinks = [
    {route: 'grades', label: 'Grades'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private menuService: MenuService
  ) {

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.changeTab());
  }

  ngOnInit () {
    if (this.isGrader) {
      this.navLinks.push({route: 'grading', label: 'Grading'});
    }

    if (this.isArchon) {
      this.navLinks.push({route: 'archon', label: 'Archon'});
    }
  }

  changeTab() {
    let findTab = (nav) => {
      return this.location.path().indexOf(nav.route) !== -1;
    };

    this.activeLinkIndex =
      this.navLinks.indexOf(this.navLinks.find(findTab));
  }

  utln = this.userService.getUtln();
  isArchon = this.userService.isAdmin();
  isGrader = this.userService.isGrader();

  isSectionSelected (section) {
    return this.menuService.isSectionSelected(section);
  }

  getSections () {
    return this.menuService.sections;
  }

  isHeading (section) {
    return section.type === 'heading';
  }

  isLink (section) {
    return section.type === 'link';
  }

  isToggle (section) {
    return section.type === 'toggle';
  }

  isOpen() {
    return true;
  }

  logOut() {
    alert("Logging out");
  }
}
