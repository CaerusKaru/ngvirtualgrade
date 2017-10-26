import {Component, OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {HomeMenuService} from './home-menu.service';
import {Platform} from '@angular/cdk/platform';
import {Subscription} from 'rxjs/Subscription';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {SwUpdatesService} from '../sw-updates/sw-updates.service';
import {routerAnimation} from '@app/shared/animations';
import {AuthService, UserService} from '@app/shared/services';
import {environment} from '@env/environment';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'vg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {

  nav$ = this._homeService.nav$;
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

  private _resizeSubscription: Subscription | null;
  private _destroy = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _homeService: HomeMenuService,
    public platform: Platform,
    public dialog: MatDialog,
    @Optional() public swUpdatesService: SwUpdatesService
  ) { }

  ngOnInit () {
    this._authService.isAdmin.pipe(takeUntil(this._destroy)).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.adminTab)].show = data;
      if (this.platform.isBrowser) {
        this.onResize(window.innerWidth);
      }
    });
    this._authService.isGrader.pipe(takeUntil(this._destroy)).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.graderTab)].show = data;
      if (this.platform.isBrowser) {
        this.onResize(window.innerWidth);
      }
    });
    this._authService.isLoggedIn.pipe(takeUntil(this._destroy)).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.gradesTab)].show = data;
      if (this.platform.isBrowser) {
        this.onResize(window.innerWidth);
      }
    });
    this._authService.isManager.pipe(takeUntil(this._destroy)).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.manageTab)].show = data;
      if (this.platform.isBrowser) {
        this.onResize(window.innerWidth);
      }
    });

    if (this.platform.isBrowser) {
      this._resizeSubscription = fromEvent(window, 'resize')
        .pipe(takeUntil(this._destroy))
        .subscribe((e: UIEvent) => this.onResize((<Window>e.target).innerWidth));
      this.onResize(window.innerWidth);
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

  onResize(width) {
    const calcSize = () => {
      return this.navLinks.reduce((a, d) => {
        return a + (d.show ? this._tabWidth : 0);
      }, 0) + this._baseWidth;
    };

    this.isSideBySide = width > Math.max(this._sideBySideWidth, calcSize());
  }

  logIn() {
    const dialogRef = this.dialog.open(SigninDialogComponent);
  }

  logOut() {
    this._authService.logout();
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
    public dialogRef: MatDialogRef<SigninDialogComponent>,
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
