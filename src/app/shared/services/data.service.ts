import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { MIN_LARGE_SCREEN, MIN_MID_SCREEN } from '../global-utils/constants';
import { isDashboard } from '../global-utils/functions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isMobile = new BehaviorSubject<boolean>(document.body.clientWidth < MIN_MID_SCREEN);
  readonly isMobile$ = this.isMobile.asObservable().pipe(shareReplay());

  private shouldLayoutHaveMenu = new BehaviorSubject<boolean>(isDashboard());
  readonly shouldLayoutHaveMenu$ = this.isMobile.asObservable().pipe(shareReplay());

  private navBar = new BehaviorSubject<boolean>(document.body.clientWidth < MIN_LARGE_SCREEN);
  readonly isHandset$ = this.navBar.asObservable().pipe(shareReplay());

  isdas() {
    return isDashboard();
  }

  updateMenuLayout() {
    const hasMenu = isDashboard();
    this.shouldLayoutHaveMenu.next(hasMenu);
  }

  updateLayout(isMobile: boolean) {
    this.isMobile.next(isMobile);
  }

  updateNavbarLayout(isMobile: boolean) {
    this.navBar.next(isMobile);
  }

  constructor() {}
}
