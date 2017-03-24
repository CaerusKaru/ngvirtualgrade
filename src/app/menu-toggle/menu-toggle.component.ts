import {
  Component, OnInit, Input, ElementRef, Renderer, AnimationStyles, AnimationKeyframe,
  AnimationPlayer
} from '@angular/core';
import {MenuService} from "../menu.service";
import {MenuToggle} from "../menu-toggle";

@Component({
  selector: 'menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss']
})
export class MenuToggleComponent implements OnInit {

  @Input () section : MenuToggle;

  ul : Element;

  constructor(
    private menuService: MenuService,
    private element: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.ul = this.element.nativeElement.querySelector('ul');
    if (this.isOpen()) {
      this.renderContent = true;

      // this makes sure that the <ul> element will be rendered when we access its
      // scrollHeight (i.e. wait until the next render cycle in the browser)
      // WARNING: this method works bc we don't overly rely on rAF. If that were
      //          the case, we would need to work outside the Angular Zone
      let initSelect = () => {
        if (!this.ul.scrollHeight) {
          requestAnimationFrame(initSelect);
        } else {
          this.renderer.setElementStyle(this.ul, 'height', this.ul.scrollHeight + 'px');
        }
      };

      initSelect();
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

    let startingStyles : AnimationStyles = {
      styles: [{}]
    };

    let keyframesTo : AnimationKeyframe[] = [
      {
        offset: 0,
        styles: {
          styles: [{
            height: '0'
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            height: this.ul.scrollHeight + 'px',
          }]
        }
      }
    ];

    let keyframesFrom : AnimationKeyframe[] = [
      {
        offset: 0,
        styles: {
          styles: [{
            height: this.ul.scrollHeight + 'px'
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            height: '0'
          }]
        }
      }
    ];

    this.menuService.toggleSelectSection(this.section);
    let open = this.renderContent;
    if (!open) {
      this.renderContent = true;
    }
    let animate : AnimationPlayer = this.renderer.animate(this.ul, startingStyles, open ? keyframesFrom : keyframesTo,
      750, 0, 'cubic-bezier(0.35, 0, 0.25, 1)');
    animate.play();
    animate.onDone(() => {if (open) this.renderContent = false});
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
