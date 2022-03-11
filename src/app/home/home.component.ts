import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { projectVersionShort } from '../app.config';
import { mobileNavAnimation } from '../shared/animations/route.animation';
import { ApiService } from '../shared/api/api.service';
import { UserService } from '../shared/api/user.service';
import { ModalNewFeaturesComponent } from '../shared/components/modal-new-features/modal-new-features/modal-new-features.component';
import { MIN_MID_SCREEN } from '../shared/global-utils/constants';
import { clearRedirectAfterLogin } from '../shared/global-utils/functions';
import { DataService } from '../shared/services/data.service';
import { DialogModalService } from '../shared/services/dialog-modal.service';
import { setUser } from '../shared/store/user/user.actions';
import { User_Model } from '../shared/store/user/user.model';

@Component({
  selector: 'home',
  template: `
    <ng-container *ngIf="currentUser$ | async as currentUser">
      <mat-spinner *ngIf="isLoading"></mat-spinner>
      <error-user *ngIf="isError" [error]="currentUser"></error-user>
      <navigation [ngClass]="{ 'should-have-menu': dataService.isdas(), 'has-navbar': dataService.isHandset$ | async }" *ngIf="!isLoading && !isError" [user]="currentUser">
        <main class="overlay" [@routeAnimations]="prepareRoute(outlet)">
          <router-outlet class="route" #outlet="outlet"></router-outlet>
        </main>
      </navigation>
    </ng-container>
  `,
  animations: [mobileNavAnimation]
})
export class HomeComponent implements AfterViewInit {
  isLoading = true;
  isError = false;
  isModalOpen = false;
  currentUser$: Observable<User_Model>;

  constructor(
    private _store: Store<{ user: User_Model }>,
    public dataService: DataService,
    private changeRef: ChangeDetectorRef,
    private _dialogService: DialogModalService,
    private _apiService: ApiService,
    private _userSErvice: UserService
  ) {
    clearRedirectAfterLogin();

    this.currentUser$ = _store.select('user').pipe(
      tap((res: User_Model) => {
        // this.checkNewFeatures(res);
        // console.log(res);
        if (res.error) this.isError = true;
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return document.body.clientWidth >= MIN_MID_SCREEN ? null : outlet?.activatedRouteData?.animation;
  }

  private checkNewFeatures(user: User_Model) {
    if (user.LASTVERSIONREAD !== projectVersionShort && !this.isModalOpen) {
      this.isModalOpen = true;
      this._apiService.getLocalDataService().subscribe((res) => {
        if (Array.isArray(res.features) && res.features.length > 0)
          this._dialogService
            .openGenericModal(ModalNewFeaturesComponent, {
              panelClass: 'features-dialog',
              width: '95%',
              maxWidth: '785px',
              maxHeight: '85vh',
              data: res.features
            })
            .afterClosed()
            .subscribe(() => {
              this._userSErvice.readLastVersionFeatures({ ID: user.ID, LASTVERSIONREAD: projectVersionShort }).subscribe(() => {
                this._store.dispatch(setUser({ user: { ...user, LASTVERSIONREAD: projectVersionShort } }));
              });
            });
      });
    }
  }
}
