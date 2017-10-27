import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HomeMenuService} from '@app/home/home-menu.service';
import {UserService} from '@app/shared/services';

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
              label: d.name,
              children: [this._home(d.name), ...d.courses.reduce((b, e) => {
                return [...b, {
                  type: 'link',
                  label: e.name,
                  link: '/manage/' + d.name + '/' + e.name
                }];
              }, [])]
            }];
          }, [])
        };

        // this._userService.managePerms.subscribe(perms => {
        //
        //   const createOption = {
        //     type: 'link',
        //     label: 'Add Dept',
        //     link: '/manage/create'
        //   };
        //
        //   const userOption = {
        //     type: 'link',
        //     label: 'Users',
        //     link: '/manage/users'
        //   };
        //
        //   const options = {
        //     type: 'header',
        //     label: 'Actions',
        //     children: []
        //   };
        //
        //   if (perms.includes(ManagePerms.CREATE)) {
        //     options.children.push(createOption);
        //   }
        //
        //   if (perms.includes(ManagePerms.UPDATE)) {
        //     options.children.push(userOption);
        //   }
        //
        //   this._homeService.setCourses([deps, options]);
        //   obs.next(true);
        //   obs.complete();
        // });
      });
    });
  }
}
