import {trigger, animate, transition, style, query, stagger, group, state, animateChild} from '@angular/animations';

export const slideAnimation =
  trigger('slideAnimation', [
    transition(':enter', [
      query('.step-main', style({ transform: 'translateY(-100px)', opacity: 0 })),
      query('.step-child', style({ transform: 'translateY(-100px)', opacity: 0, })),
      query('.step-main, .step-child', [
        stagger(100, [
          animate('500ms cubic-bezier(.35,0,.25,1)', style('*'))
        ])
      ])
    ]),
    transition(':leave',
      query('.step-main, .step-child', [
        stagger(-100, [
          animate('500ms 100ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100px)', opacity: 0 }))
        ]),
      ])
    ),
  ]);

export const slideChildAnimation =
  trigger('slideChildAnimation', [
    transition(':enter', [
      query('.step-child', style({ transform: 'translateY(-100px)', opacity: 0, })),
      query('.step-child', animate('500ms cubic-bezier(.35,0,.25,1)', style('*')))
    ]),
    transition(':leave', [
      query('.step-child', animate('500ms 100ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100px)', opacity: 0 })))
    ])
  ]);

export const hideAnimation =
  trigger('hideAnimation', [
    state('show', style({ height: '*', visibility: 'visible', opacity: 1 })),
    state('hide', style({ height: '0', visibility: 'hidden', opacity: 0 })),
    transition('show <=> hide', animate('500ms 100ms cubic-bezier(.35,0,.25,1)')
    )
  ]);
