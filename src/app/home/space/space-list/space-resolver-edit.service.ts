import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GroupService } from 'src/app/shared/api/group.service';
import { Group_Data_Modal, GROUP_TYPE } from 'src/app/shared/models/models';
import { ToastNotifService } from 'src/app/shared/services/toast-notif.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceResolverEditService implements Resolve<Group_Data_Modal | null> {
  constructor(private _groupService: GroupService, private _toastService: ToastNotifService, private _router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Group_Data_Modal | null> {
    const vId = Number(route.paramMap.get('id'));
    if (isNaN(vId)) {
      this.exitWithError(true);
      return of(null);
    }
    return this._groupService.getGroupOrSpaceById(vId).pipe(
      tap((res: any) => {
        if (res.error) this.exitWithError(false);
      }),
      map((data) => ({ type: GROUP_TYPE.Space, data }))
    );
  }

  exitWithError(isIdNotValid: boolean) {
    this._router.navigate(['group-list']);
    if (isIdNotValid) {
      this._toastService.showError("Id d'Espace/Zone erroné");
      return;
    }
    this._toastService.showWarning('Espaces/Zones non trouvé');
  }
}
