import { Injectable } from '@angular/core';
import {MenuLink} from "./menu-link";
import {MenuToggle} from "./menu-toggle";
import {MenuHeading} from "./menu-heading";
import {Router, NavigationEnd} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class MenuService {

  // FUTURE ROADMAP:
  //
  // The way the service currently works is very non-performant,
  // it relies heavily on the Angular digest cycle (or the emitter)
  //
  // The better alternative is to have a couple of observables that
  // emit to every toggle and link when the selection changes based
  // on URL location changes
  //
  // This feature is planned for the next feature version upgrade
  // of the system, or whenever the menu is spun into its own
  // module. Alternatively, this may just be a placeholder until
  // Angular Material gets its act together and builds one of their
  // own like they said they would for two years now

  constructor(
    private router : Router,
    private location : Location
  ) {
    this.initRouter();
  }

  get sections () {
    return this._sections;
  }

  public selectSection (section) {
    this.openedSection = section;
  }

  public toggleSelectSection (section) {
    this.openedSection = (this.openedSection === section ? null : section);
  }

  public isSectionSelected (section) {
    return this.openedSection === section;
  }

  public selectPage (section, page) {
    this.openedSection = section;
    this.currentPage = page;
  }

  public isPageSelected (page) {
    return this.currentPage === page;
  }

  private _sections : any[];
  private openedSection : MenuToggle;
  private currentPage : MenuLink;
  private mode : string;

  private initRouter () {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.updateSelection(this.location.path()));
  }

  private matchPage (section, page) {
    if (this.location.path().indexOf(page.url) !== -1) {
      this.selectSection(section);
      this.selectPage(section, page);
    }
  };

  private updateSelection (url : string) {
    let realUrl = url.split('/').slice(1);
    let newMode = realUrl[0];
    if (newMode === 'signin') {
      return;
    }
    if (newMode !== this.mode) {
      this.mode = newMode;
      this.buildMenu();
    }

    let self = this;
    this.sections.forEach(function(section) {
      if (section.type === 'heading') {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.type === 'toggle'){
            childSection.pages.forEach(function(page){
              self.matchPage(childSection, page);
            });
          }
        });
      }
      else if (section.type === 'toggle') {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          self.matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        self.matchPage(section, section);
      }
    });
  }

  private buildMenu () {

    let newSections = []; // new tree
    let newChildren = []; // list of courses that have pages

    let test1 : MenuLink = {
      url: 'grades/00/hw4',
      name: 'hw4',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let test2 : MenuLink = {
      url: 'grades/170/hw1',
      name: 'hw1',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let test3 : MenuLink = {
      url: 'grades/170/hw2',
      name: 'hw2',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let test4 : MenuLink = {
      url: 'grades/170/hw3',
      name: 'hw3',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let test5 : MenuLink = {
      url: 'archon/170/create',
      name: 'Create',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let test6 : MenuLink = {
      url: 'grading/170/hw1',
      name: 'hw1',
      hidden: false,
      id: '',
      className: '',
      type: 'link'
    };

    let comp170 : MenuToggle;
    let comp00 : MenuToggle;
    let head : MenuHeading;


    if (this.mode === 'grades') {
      comp00 = {
        name: 'COMP 00',
        hidden: false,
        className: '',
        type: 'toggle',
        pages: [test1]
      };
      head = {
        name: 'Courses',
        children: [comp00],
        className: '',
        type: 'heading'
      };
    } else if (this.mode === 'grading') {
      comp170 = {
        name: 'COMP 170',
        hidden: false,
        className: '',
        type: 'toggle',
        pages: [test6]
      };
      head = {
        name: 'Courses',
        children: [comp170],
        className: '',
        type: 'heading'
      };
    } else if (this.mode === 'archon') {
      comp170 = {
        name: 'COMP 170',
        hidden: false,
        className: '',
        type: 'toggle',
        pages: [test2, test3, test4, test5]
      };
      head = {
        name: 'Courses',
        children: [comp170],
        className: '',
        type: 'heading'
      };
    }

    this._sections = [head];

    //   angular.forEach(data, function (course) {
    //     var newPages = [];
    //     angular.forEach(course.assigns, function (value) {
    //       var newChild = {
    //         name: value,
    //         url: mode + '/' + course.name + '/' + value,
    //         type: 'link'
    //       };
    //       newPages.push(newChild);
    //     });
    //
    //     newPages = orderBy(newPages, 'name');
    //     // add page-dependent sections
    //     // can add exceptions if nec.
    //     if (mode === 'grading') {
    //       newPages.push({
    //         name: 'Grader Portal',
    //         url: mode + '/' + course.name + '/portal',
    //         type: 'link'
    //       });
    //     } else if (mode === 'grades') {
    //       newPages.push({
    //         name: 'Grade Report',
    //         url: mode + '/' + course.name + '/report',
    //         type: 'link'
    //       });
    //       newPages.push({
    //         name: 'Regrade Req.',
    //         url: mode + '/' + course.name + '/regrade',
    //         type: 'link'
    //       });
    //     } else if (mode === 'archon') {
    //       newPages.push({
    //         name: 'Add new',
    //         url: mode + '/' + course.name + '/create',
    //         type: 'link'
    //       });
    //       newPages.push({
    //         name: 'Overview',
    //         url: mode + '/' + course.name + '/overview',
    //         type: 'link'
    //       });
    //     }
    //
    //     newChildren.push({
    //       name: 'COMP ' + course.name,
    //       type: 'toggle',
    //       pages: newPages
    //     });
    //   });
    //
    //   newSections.push({
    //     name: 'Courses',
    //     type: 'heading',
    //     children: newChildren
    //   });
    //
    //   sections = newSections;
    // }
  }
}