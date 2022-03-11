import { ChangeDetectionStrategy, Component, Input, NgZone, OnDestroy } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { DESKTOP_TO_MOBILE_LINKS, MIN_LARGE_SCREEN, MIN_MID_SCREEN, MOBILE_TO_DESKTOP_LINKS } from '../../global-utils/constants';
import { DataService } from '../../services/data.service';
import { User_Model } from '../../store/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnDestroy {
  constructor(private _ngZone: NgZone, public dataService: DataService, private _router: Router) {
    this.initDetectResize();
    this.checkResponsiveRedirect(document.body.clientWidth < MIN_MID_SCREEN);
  }
  @Input() user: User_Model = {} as User_Model;

  oldWidth = document.body.clientWidth;
  isMidScreen: boolean = this.isLayoutMidScreen();

  readonly isHandset$ = this.dataService.isHandset$.pipe(
    shareReplay(),
    tap((res) => (this.isMidScreen = res))
  );

  toggleNavOnMobile(pDrawer: MatSidenav) {
    if (this.isMidScreen) pDrawer.close();
  }

  private isLayoutMidScreen(): boolean {
    return document.body.clientWidth < MIN_LARGE_SCREEN;
  }

  private handleDocumentClick() {
    const newWidth = document.body.clientWidth;

    // mid screen layout
    if ((this.oldWidth >= MIN_LARGE_SCREEN && newWidth < MIN_LARGE_SCREEN) || (newWidth >= MIN_LARGE_SCREEN && this.oldWidth < MIN_LARGE_SCREEN))
      this._ngZone.run(() => {
        this.dataService.updateNavbarLayout(newWidth < MIN_LARGE_SCREEN);
      });

    // mobile layout
    if ((this.oldWidth >= MIN_MID_SCREEN && newWidth < MIN_MID_SCREEN) || (newWidth >= MIN_MID_SCREEN && this.oldWidth < MIN_MID_SCREEN))
      this._ngZone.run(() => {
        this.updateLayout(newWidth < MIN_MID_SCREEN);
      });

    this.oldWidth = newWidth;
  }

  private checkResponsiveRedirect(isMobile: boolean) {
    if (!isMobile && document.body.clientWidth >= MIN_MID_SCREEN) {
      const vLink = MOBILE_TO_DESKTOP_LINKS.find((l) => this._router.url.indexOf(l.source) > -1);
      if (vLink) this._router.navigate([`home/${vLink?.destination}`]);
    } else if (isMobile && document.body.clientWidth < MIN_MID_SCREEN) {
      const vLink = DESKTOP_TO_MOBILE_LINKS.find((l) => this._router.url.indexOf(l.source) > -1);
      if (vLink) this._router.navigate([`home/${vLink?.destination}`]);
    }
  }

  private updateLayout(isMobile: boolean) {
    this.checkResponsiveRedirect(isMobile);

    this.dataService.updateLayout(isMobile);
  }

  private initDetectResize() {
    this.handleBind = this.handleDocumentClick.bind(this);
    this._ngZone.runOutsideAngular(() => {
      this.toggleEventListener();
    });
  }

  handleBind: any;
  private toggleEventListener(add = true) {
    if (add) window.addEventListener('resize', this.handleBind, false);
    else window.removeEventListener('resize', this.handleBind, false);
  }

  ngOnDestroy(): void {
    // console.log('cancelled');
    this.toggleEventListener(false);
  }
}
