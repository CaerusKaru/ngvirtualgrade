import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routerAnimation =
  trigger('routeAnimation', [
    transition(':enter', animateChild()),
    transition('1 => 2, 2 => 3, 1 => 3', [
      query('.router-container', style({ position: 'relative '})),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      query(':enter', style({ opacity: 0, transform: 'translateX(100%)' })),

      group([
        query(':leave', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)', opacity: 0 }))),
        query(':enter', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })))
      ]),
    ]),
    transition('3 => 2, 2 => 1, 3 => 1', [
      query('.router-container', style({ position: 'relative '})),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      query(':enter', style({ opacity: 0, transform: 'translateX(-100%)' })),

      group([
        query(':leave', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)', opacity: 0 }))),
        query(':enter', animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })))
      ])
    ])
  ]);
