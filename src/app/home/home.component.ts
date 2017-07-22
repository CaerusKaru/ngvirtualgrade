import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {group, query, transition, trigger, style, animate, animateChild} from '@angular/animations';
import {SwUpdatesService} from '../sw-updates/sw-updates.service';
import {HomeMenuService} from './home-menu.service';

@Component({
  selector: 'vg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routeAnimation', [
      transition(':enter', []),
      transition('1 => 2, 2 => 3, 1 => 3', [
        query('.router-container', style({ position: 'relative '})),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        query(':enter', style({ opacity: 0, transform: 'translateX(100%)' })),

        group([
          query(':leave', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)', opacity: 0 }))),
          query(':enter', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })))
        ])
      ]),
      transition('3 => 2, 2 => 1, 3 => 1', [
        query('.router-container', style({ position: 'relative '})),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        query(':enter', style({ opacity: 0, transform: 'translateX(-100%)' })),

        group([
          query(':leave', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)', opacity: 0 }))),
          query(':enter', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })))
        ])
      ])
    ])
  ]
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

  private _destroy = new Subject<void>();

  constructor(
    private _router: Router,
    private _location: Location,
    private _userService: UserService,
    private _authService: AuthService,
    private _homeService: HomeMenuService,
    swUpdates: SwUpdatesService,
    public dialog: MdDialog
  ) {
    takeUntil.call(this._router.events
      .filter(event => event instanceof NavigationEnd), this._destroy)
      .subscribe((event) => this.changeTab());
  }

  ngOnInit () {
    takeUntil.call(this._authService.isAdmin, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.adminTab)].show = data;
    });
    takeUntil.call(this._authService.isGrader, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.graderTab)].show = data;
    });
    takeUntil.call(this._authService.isLoggedIn, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.gradesTab)].show = data;
    });
    takeUntil.call(this._authService.isManager, this._destroy).subscribe(data => {
      this.navLinks[this.navLinks.indexOf(this.manageTab)].show = data;
    });

    this.onResize(window.innerWidth);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  prepRouteState(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    return data ? data['depth'] : '';
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width) {
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
