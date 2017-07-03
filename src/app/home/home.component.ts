import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {Observable} from 'rxjs/Observable';
import {MdDialog, MdDialogRef} from '@angular/material';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';

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
  adminTab = {route: '/admin', label: 'Admin', show: false};
  graderTab = {route: '/grading', label: 'Grading', show: false};
  gradesTab = {route: '/grades', label: 'Grades', show: false};

  navLinks = [
    {route: '/', label: 'Home', show: true},
    this.gradesTab,
    this.graderTab,
    this.adminTab
  ];

  utln$: Observable<string> = this._userService.utln;
  isSideBySide = true;

  private _grades: Observable<string[]>;
  private _grading: Observable<string[]>;
  private _admin: Observable<string[]>;
  private _sideBySideWidth = 875;
  private _isOpen = false;

  constructor(
    private _router: Router,
    private _location: Location,
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MdDialog
  ) {
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.changeTab());
    this._grading = this._userService.grading;
    this._admin = this._userService.admin;
    this._grades = this._userService.courses;
  }

  ngOnInit () {
    this._userService.isAdmin.subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.adminTab)].show = data;
    });
    this._userService.isGrader.subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.graderTab)].show = data;
    });
    this._authService.loggedIn.subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.gradesTab)].show = data;
    });

    this.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width) {
    this.isSideBySide = width > this._sideBySideWidth;
  }

  toggle() {
    this._isOpen = !this._isOpen;
  }

  get isOpen() {
    return this._isOpen;
  }

  logIn() {
    const dialogRef = this.dialog.open(SigninDialogComponent);
  }

  logOut() {
    this._authService.logout();
  }

  private changeTab() {
    const findTab = (nav) => {
      if (nav.route === '/') {
        return this._router.url === '' || this._router.url === '/';
      }
      return this._location.path().indexOf(nav.route) !== -1;
    };

    this.activeLinkIndex =
      this.navLinks.indexOf(this.navLinks.find(findTab));
    this.mode = this.navLinks[this.activeLinkIndex].route;
    if (this.mode === '/admin') {
      this.courses = this._admin;
    } else if (this.mode === '/grading') {
      this.courses = this._grading;
    } else {
      this.courses = this._grades;
    }
  }
}

@Component({
  selector: 'vg-signin-dialog',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninDialogComponent {

  entityName: string = environment.ENTITY_NAME;
  error = false;

  constructor(
    public dialogRef: MdDialogRef<SigninDialogComponent>,
    private _authService: AuthService
  ) { }

  login (f: NgForm) {
    if (!f.value.username) {
      this.error = true;
      return;
    }
    this._authService.login(f.value.username, f.value.password);
    this.dialogRef.close(true);
    //   .subscribe(
    //   data => {
    //     this.dialogRef.close(true);
    //   },
    //   error => {
    //     this.error = true;
    //   }
    // );
  }
}
