import { trigger, transition, query, style, animate, group, AnimationMetadata, animateChild } from '@angular/animations';

export const mobileNavAnimation = trigger('routeAnimations', [
  transition('ParentContainer => ChildContainer', slideTo('right', { duration: 200, shouldShowLeave: true })),
  transition('ParentContainer => *', slideTo('left', { duration: 200, shouldShowLeave: false })),
  transition('ChildContainer => ParentContainer', slideTo('left', { duration: 200, shouldShowLeave: true })),
  transition('* => ParentContainer', slideTo('right', { duration: 200, shouldShowLeave: true }))
]);

function slideTo(direction: 'left' | 'right', config: Config_Animation) {
  const { duration, shouldShowLeave } = config;
  const optional = { optional: true };
  const position = direction == 'left' ? 100 : -100;

  const groupQuery = [query(':leave', [animate(`${duration}ms ease-out`, style({ left: `${1 * position}%` }))], optional)];
  if (shouldShowLeave) groupQuery.push(query(':enter', [animate(`${duration}ms ease-out`, style({ left: '0%' }))], optional));

  return [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ],
      optional
    ),
    query(':enter', [style({ left: `${-1 * position}%` })], optional),
    query(':leave', animateChild(), optional),
    group(groupQuery),
    query(':enter', animateChild(), optional)
  ];
}

interface Config_Animation {
  duration: number;
  shouldShowLeave: boolean;
}
