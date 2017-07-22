import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {HomeMenuService} from '../../home/home-menu.service';

@Injectable()
export class ManageResolver implements Resolve<boolean> {

  private _courses = this._userService.manage;

  private _home = c => {
    return {
      type: 'link',
      label: 'Home',
      link: '/manage/' + c
    };
  };

  constructor(
    private _userService: UserService,
    private _homeService: HomeMenuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>(obs => {
      this._courses.subscribe(data => {

        const deps = {
          type: 'header',
          label: 'Departments',
          children: data.reduce((a, d) => {
            return [...a, {
              type: 'toggle',
              label: d['name'],
              children: [this._home(d['name']), ...d['courses'].reduce((b, e) => {
                return [...b, {
                  type: 'link',
                  label: e,
                  link: '/manage/' + d['name'] + '/' + e
                }];
              }, [])]
            }];
          }, [])
        };

        this._homeService.setCourses([deps]);
        obs.next(true);
        obs.complete();
      });
    });
  }
}
