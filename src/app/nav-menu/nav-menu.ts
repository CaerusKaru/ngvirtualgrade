import {Component, OnInit, Input, ViewEncapsulation, ViewChildren, QueryList, AfterContentInit} from '@angular/core';
import {NavMenuService} from "./shared/nav-menu.service";
import {animate, style, transition, state, trigger} from "@angular/animations";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Location} from "@angular/common";

let uniqueId = 0;

@Component({
  host: {
    '[attr.id]': 'id'
  },
  selector: 'nav-menu-link',
  templateUrl: './nav-menu-link.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavMenuLinkComponent implements OnInit {

  @Input() link : string;
  @Input() id : number = uniqueId++;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private menuService : NavMenuService
  ) { }

  ngOnInit() {
    this.menuService.openPage.subscribe(data => this._isSelected = data === this.id);
    this.initRouter();
  }

  isSelected () {
    return this.menuService.isPageSelected(this.id);
  };

  navigate(url) {
    this.router.navigate([url]);
  }

  private _isSelected : boolean;

  private initRouter() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(
      event => {
        if (this.location.path().indexOf(this.link) !== -1) {
          this.menuService.selectPage(this.id);
        }
      }
    );
  }
}

@Component({
  host: {
    '[attr.id]': 'id'
  },
  selector: 'nav-menu-toggle',
  templateUrl: './nav-menu-toggle.component.html',
  animations: [
    trigger('openMenu', [
      state('false', style({
        visibility: 'hidden',
        height: 0
      })),
      state('true',  style({
        visibility: 'visible',
        height: '*'
      })),
      transition('void => *', animate(0, style({ height: 0 }))),
      transition('* => *', animate('750ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuToggleComponent implements AfterContentInit {

  @Input () label : string;
  @Input () id : number = uniqueId++;
  @ViewChildren(NavMenuLinkComponent) links : QueryList<NavMenuLinkComponent>;

  constructor(
    private menuService: NavMenuService
  ) { }

  ngAfterContentInit () {
    this.menuService.openSection.subscribe(data => {
      this._openSection = data == this.id;
    });
    this.menuService.openPage.filter(data => data !== null).subscribe(data => {
      console.log(this.links);
      this._openPage = data;
      this._openSection = this.links.reduce((a, d) => { console.log(d.id); return a ? a : d.id === data }, false);
      if (this._openSection) {
        console.log('select!');
        this.menuService.selectSection(this.id);
      }
    });
  }

  public isOpen () {
    return this._openSection;
  }

  public toggle ()  {
    this.menuService.toggleSelectSection(this.id);
  }

  private _openSection : boolean;
  private _openPage : number;
}

@Component({
  selector: 'nav-menu-header',
  templateUrl: './nav-menu-header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavMenuHeaderComponent {
  @Input () label : string;
  constructor() { }
}

@Component({
  selector: 'nav-menu-container',
  templateUrl: './nav-menu-container.component.html',
  styleUrls: ['./nav-menu-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuContainerComponent { }
