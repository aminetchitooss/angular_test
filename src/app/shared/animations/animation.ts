import { trigger, transition, style, animate } from '@angular/animations';

export const YToBottom = trigger('YToBottom', [
  transition(':enter', [style({ transform: 'translateY(-5%)', opacity: 0 }), animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))]),
  transition(':leave', [style({ transform: 'scaleY(1)', opacity: 1 }), animate('200ms', style({ transform: 'scaleY(0)', height: '0px', opacity: 0 }))])
]);

export const YToTop = trigger('YToTop', [
  transition(':enter', [style({ transform: 'translateY(10%)', opacity: 0 }), animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))])
]);

export const XToRight = trigger('XToRight', [
  transition(':enter', [style({ transform: 'translateX(-10%)', opacity: 0 }), animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))]),
  transition(':enter', [style({ transform: 'translateX(0%)', opacity: 0 }), animate('300ms', style({ transform: 'translateX(-10%)', opacity: 1 }))])
]);

export const XToLeft = trigger('XToLeft', [
  transition(':enter', [style({ transform: 'translateX(10%)', opacity: 0 }), animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))]),
  transition(':leave', [style({ transform: 'translateX(0)', opacity: 1 }), animate('300ms', style({ transform: 'translateX(10%)', opacity: 0 }))])
]);

export const smoothShow = trigger('smoothShow', [transition(':enter', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))])]);
export const formShowFirst = trigger('formShowFirst', [
  transition(':enter', [style({ overflow: 'hidden', maxHeight: 0 }), animate('200ms', style({ maxHeight: '500px' }))]),
  transition(':leave', [style({ maxHeight: '500px', opacity: 0 }), animate('200ms', style({ overflow: 'hidden', maxHeight: 0 }))])
]);

export const formShow = trigger('formShow', [
  transition(':enter', [style({ overflow: 'hidden', maxHeight: 0 }), animate('800ms', style({ maxHeight: '1000px' }))]),
  transition(':leave', [style({ maxHeight: '1000px', opacity: 0 }), animate('400ms', style({ overflow: 'hidden', maxHeight: 0 }))])
]);
export const shakeShow = trigger('shakeShow', [
  transition(':enter', [
    style({ transform: 'translate3d(0, 0, 0)', opacity: 0, height: '5px' }),
    animate('100ms', style({ transform: 'translate3d(-1px, 0, 0)', opacity: 1, height: '10px' })),
    animate('100ms', style({ transform: 'translate3d(2px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(-4px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(4px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(-4px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(4px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(-4px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(2px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(-1px, 0, 0)', opacity: 1, height: '20px' })),
    animate('100ms', style({ transform: 'translate3d(0, 0, 0)', opacity: 1, height: '20px' }))
  ])
]);
