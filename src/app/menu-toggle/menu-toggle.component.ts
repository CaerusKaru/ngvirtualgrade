import {
  Component, Input, AfterViewInit, trigger, state,
  style, animate, transition
} from '@angular/core';
import {MenuService} from "../menu.service";
import {MenuToggle} from "../menu-toggle";

@Component({
  selector: 'menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss'],
  animations: [
    trigger('openMenu', [
      state('false', style({
        visibility: 'hidden',
        height: 0
      })),
      state('true',  style({
        visibility: 'visible'
      })),
      transition('void => *', animate(0, style({ height: 0 }))),
      transition('* => *', animate('750ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class MenuToggleComponent implements AfterViewInit {

  @Input () section : MenuToggle;

  ul : Element;

  constructor(
    private menuService: MenuService
  ) { }

  ngAfterViewInit() {
    if (this.isOpen()) {
      this.renderContent = true;
    }
  }

  // Used for toggling the visibility of the accordion's content, after
  // all of the animations are completed. This prevents users from being
  // allowed to tab through to the hidden content.
  renderContent = false;

  isOpen () {
    return this.menuService.isSectionSelected(this.section);
  }

  toggle ()  {
    this.menuService.toggleSelectSection(this.section);
  }

  // $rootScope.$on('openMenu', openMenu);
  //
  //
  // // *********************
  // // Internal methods
  // // *********************
  //
  // function closeMenu() {
  //   $timeout(function() { $mdSidenav('left').close(); });
  // }
  //
  // function openMenu() {
  //   $timeout(function() { $mdSidenav('left').open(); });
  // }
}
