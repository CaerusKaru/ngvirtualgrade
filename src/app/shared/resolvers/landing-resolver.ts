import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {HomeMenuService} from '../../home/home-menu.service';

@Injectable()
export class LandingResolver implements Resolve<boolean> {

  private _landing = {
    type: 'header',
    label: 'Pages',
    children: [
      {
        type: 'link',
        label: 'Home',
        link: '/'
      },
      {
        type: 'link',
        label: 'About',
        link: '/about'
      },
      {
        type: 'link',
        label: 'Help',
        link: '/help'
      }
    ]
  };

  constructor(private _homeService: HomeMenuService) { }

  resolve(route: ActivatedRouteSnapshot) {
    this._homeService.setCourses([this._landing]);
    return Observable.of(true);
  }
}
