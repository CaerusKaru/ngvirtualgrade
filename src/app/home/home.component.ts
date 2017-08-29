import {Component, OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {takeUntil as takeUntilOp} from 'rxjs/operator/takeUntil';
import {HomeMenuService} from './home-menu.service';
import {routerAnimation} from '../shared/animations/router.animation';
import {Platform} from '@angular/cdk/platform';
import {Subscription} from 'rxjs/Subscription';
import {filter, RxChain, takeUntil} from '@angular/cdk/rxjs';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {SwUpdatesService} from '../sw-updates/sw-updates.service';

@Component({
  selector: 'vg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {

  navs$ = this._homeService.navs$;
  utln$ = this._userService.utln;
  isSideBySide = true;
  activeLinkIndex = -1;
  adminTab = {route: '/admin', label: 'Admin', show: false};
  graderTab = {route: '/grading', label: 'Grading', show: false};
  gradesTab = {route: '/courses', label: 'Courses', show: false};
  manageTab = {route: '/manage', label: 'Manage', show: false};

  navLinks = [
    {route: '/', label: 'Home', show: true},
    this.gradesTab,
    this.graderTab,
    this.adminTab,
    this.manageTab
  ];

  private _tabWidth = 160;
  private _baseWidth = 220;
  private _sideBySideWidth = 875;
  private _isOpen = false;

  private _resizeSubscription: Subscription | null;
  private _destroy = new Subject<void>();

  constructor(
    private _router: Router,
    private _location: Location,
    private _userService: UserService,
    private _authService: AuthService,
    private _homeService: HomeMenuService,
    public platform: Platform,
    public dialog: MdDialog,
    @Optional() public swUpdatesService: SwUpdatesService
  ) {
    RxChain.from(this._router.events)
      .call(filter, event => event instanceof NavigationEnd)
      .call(takeUntil, this._destroy)
      .subscribe(e => this.changeTab());
  }

  ngOnInit () {
    takeUntilOp.call(this._authService.isAdmin, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.adminTab)].show = data;
    });
    takeUntilOp.call(this._authService.isGrader, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.graderTab)].show = data;
    });
    takeUntilOp.call(this._authService.isLoggedIn, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.gradesTab)].show = data;
    });
    takeUntilOp.call(this._authService.isManager, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.manageTab)].show = data;
    });

    if (this.platform.isBrowser) {
      this._resizeSubscription = RxChain.from(fromEvent(window, 'resize'))
        .call(takeUntil, this._destroy)
        .subscribe(e => this.onResize(e));
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  prepRouteState(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    return data ? data['depth'] : '';
  }

  onResize(evt) {
    const width = evt.target.innerWidth;
    const calcSize = () => {
      return this.navLinks.reduce((a, d) => {
        return a + (d.show ? this._tabWidth : 0);
      }, 0) + this._baseWidth;
    };

    this.isSideBySide = width > Math.max(this._sideBySideWidth, calcSize());
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

    const idx = this.navLinks.indexOf(this.navLinks.find(findTab));
    this.activeLinkIndex = (idx === -1) ? 0 : idx;
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
