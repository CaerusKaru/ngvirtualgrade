import {
  Component, Input, ViewEncapsulation, QueryList,
  OnDestroy, ContentChildren, AfterViewInit, ElementRef, Renderer2, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {NavMenuService} from './shared/nav-menu.service';
import {
  animate, style, transition, state, trigger
} from '@angular/animations';
import {Observable} from 'rxjs/Observable';

let uniqueId = 0;

@Component({
  host: {
    '[attr.id]': 'id',
    '[class.nav-link]': 'true'
  },
  selector: 'nav-menu-link',
  templateUrl: './nav-menu-link.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuLinkComponent implements AfterViewInit {

  @Input() link: string;
  @Input() id: number = uniqueId++;

  public isSelected$: Observable<boolean>;

  constructor(private menuService: NavMenuService) { }

  ngAfterViewInit() {
    this.isSelected$ = this.menuService.openPage.map(i => i === this.id);
  }
}

@Component({
  host: {
    '[attr.id]': 'id'
  },
  selector: 'nav-menu-toggle',
  templateUrl: './nav-menu-toggle.html',
  animations: [
    trigger('toggleExpansion', [
      state('collapsed', style({height: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('750ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuToggleComponent implements AfterViewInit, OnDestroy {

  @Input () label: string;
  @Input () private id: number = uniqueId++;
  @ContentChildren(NavMenuLinkComponent) private links: QueryList<NavMenuLinkComponent>;

  isOpen: Observable<boolean>;

  constructor(private menuService: NavMenuService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit () {
    this.isOpen = this.menuService.openSection.map(d => d === this.id);
    this.initLinks();
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy () {
    this.links.toArray().map(c => this.menuService.removeLink(c.id, c.link, this.id));
  }

  public toggle ()  {
    this.menuService.toggleSelectSection(this.id);
  }

  private initLinks () {
    this.links.toArray().map(c => this.menuService.addLink(c.id, c.link, this.id));
  }
}

@Component({
  selector: 'nav-menu-header',
  templateUrl: './nav-menu-header.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuHeaderComponent {
  @Input() label: string;
  constructor() { }
}

@Component({
  host: {
    '[class.nav-menu]': 'true',
    '[class.site-sidenav]': 'true',
    '[attr.hide-print]': 'true'
  },
  selector: 'nav-menu-container',
  templateUrl: './nav-menu-container.html',
  styleUrls: ['./nav-menu.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuContainerComponent {
  private _color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /** The color of the nav-menu. Can be primary, accent, or warn. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._updateColor(value);
  }

  private _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  private _setElementColor(color: string, isAdd: boolean) {
    if (color && color !== '') {
      if (!isAdd) {
        this.renderer.removeClass(this.elementRef.nativeElement, `mat-${color}`);
      } else {
        this.renderer.addClass(this.elementRef.nativeElement, `mat-${color}`);
      }
    }
  }
}
