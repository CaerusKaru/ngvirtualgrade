import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class HomeMenuService {

  navs$: Observable<any[]>;

  private _navs: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {
    this.navs$ = this._navs.asObservable();
  }

  /**
   * very opinionated constructor from course data to nav-menu data
   * @param courses - a list of courses in course data format
   * @param mode - the current nav mode or top-level nav name
   * @param active - whether the course heading should be active or inactive
   * @return the list of courses in nav-menu data format
   */
  public constructCourses(courses, mode, active) {

    const home = c => {
      return {
        type: 'link',
        label: 'Home',
        link: '/' + mode + '/' + c
      };
    };

    const options = c => {
      if (mode === 'admin') {
        return [
          {
            type: 'link',
            label: 'Create New',
            link: '/' + mode + '/' + c + '/create'
          },
          {
            type: 'link',
            label: 'Gradebook',
            link: '/' + mode + '/' + c + '/gradebook'
          },
          {
            type: 'link',
            label: 'Calendar',
            link: '/' + mode + '/' + c + '/calendar'
          },
          {
            type: 'link',
            label: 'Graders',
            link: '/' + mode + '/' + c + '/graders'
          }
        ];
      }

      return [];
    };

    const newCourses = courses.reduce((a, d) => {
      return [...a, {
        type: 'toggle',
        label: d['name'],
        children: [home(d['name']), ...d['assigns'].reduce((b, e) => {
          return [...b, {
            type: 'link',
            label: e,
            link: '/' + mode + '/' + d['name'] + '/' + e
          }];
        }, []), ...options(d['name'])]
      }];
    }, []);

    return {
      type: 'header',
      label: active ? 'Courses' : 'Inactive Courses',
      children: newCourses
    }
  }

  /**
   * set the nav menu courses with nav-menu data formatted array
   * @param courses - a list of courses in nav-menu data format
   */
  public setCourses(courses: any[]) {
    this._navs.next(courses);
  }
}
