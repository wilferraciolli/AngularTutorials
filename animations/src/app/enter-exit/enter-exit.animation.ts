import { animate, style, transition, trigger } from '@angular/animations';

export const EnterExit = [
  trigger('fadeSlideInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))
    ])
  ])
];
