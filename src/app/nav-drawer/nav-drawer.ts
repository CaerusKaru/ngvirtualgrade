import {
  Component,
  Input,
  ViewEncapsulation,
  QueryList,
  OnDestroy,
  ContentChildren,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Directive,
} from '@angular/core';
import {NavDrawerService} from './shared/nav-drawer.service';
import {animate, style, transition, state, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

let uniqueId = 0;

@Component({
  host: {
    '[attr.id]': 'id',
    '[class.nav-link]': 'true'
  },
  selector: 'li[matNavDrawerLink], a[matNavDrawerLink]',
  templateUrl: './nav-drawer-link.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerLinkComponent implements AfterViewInit {

  @Input() link: string;
  @Input() id: number = uniqueId++;

  isSelected$: Observable<boolean>;

  constructor(private menuService: NavDrawerService) { }

  ngAfterViewInit() {
    this.isSelected$ = this.menuService.openPage.pipe(map(i => i === this.id));
  }
}

@Component({
  host: {
    '[class.mat-nav-drawer-toggle]': 'true'
  },
  selector: 'ul[matNavDrawerToggle]',
  templateUrl: './nav-drawer-toggle.html',
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
export class NavDrawerToggleComponent implements AfterViewInit, OnDestroy {

  @Input() label: string;
  @ContentChildren(NavDrawerLinkComponent) private links: QueryList<NavDrawerLinkComponent>;

  isOpen: Observable<boolean>;

  private _id: number = uniqueId++;

  constructor(private menuService: NavDrawerService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.isOpen = this.menuService.openSection.pipe(map(d => d === this._id));
    this.initLinks();
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.links.toArray().map(c => this.menuService.removeLink(c.id, c.link, this._id));
  }

  toggle()  {
    this.menuService.toggleSelectSection(this._id);
  }

  private initLinks() {
    this.links.toArray().map(c => this.menuService.addLink(c.id, c.link, this._id));
  }
}

@Directive({
  selector: '[matNavDrawerHeader]',
  host: {
    '[class.mat-nav-drawer-header]': 'true',
    '[class.md-subhead]': 'true'
  }
})
export class NavDrawerHeaderDirective { }

@Component({
  host: {
    '[class.mat-nav-drawer]': 'true',
    '[attr.hide-print]': 'true',
    'role': 'navigation'
  },
  selector: 'mat-nav-drawer',
  template: '<ng-content></ng-content>',
  styleUrls: ['./nav-drawer.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerContainerComponent {
  private _color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /** The color of the nav-drawer. Can be primary, accent, or warn. */
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
