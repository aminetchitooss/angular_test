import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ACTIVITY_VIEW } from 'src/app/shared/models/models';
import { Response_Type, UserSlot, UserDataResult, NameSearch } from '../models/models';
import { User_Model } from '../store/user/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public PROFIL_API_URL = '/Api/Profil/';
  public DATA_USER_API_URL = '/Api/DateUser/';
  public USER_API_URL = '/Api/User/';
  currentUser: User_Model | null = null;

  constructor(private apiservice: ApiService) {}

  getProfil(): Observable<Response_Type<User_Model>> {
    return this.apiservice.getLocalDataService(false).pipe(map((r) => r.user[0]));
  }

  getUserDashData(pView: ACTIVITY_VIEW, pMinDate: Date | null): Observable<Response_Type<UserDataResult>> {
    return this.apiservice.getLocalDataService(false).pipe(map((r) => r.SelGaugeAndUserPeriod[0]));
  }

  getUserDataByGroupOrSpaceId(pId: number, pView: ACTIVITY_VIEW, pMinDate: Date | null): Observable<Response_Type<UserDataResult>> {
    return this.apiservice.getLocalDataService(false).pipe(map((r) => r.mobileGroupById[0]));
  }

  updateDaySlotStatus(pBody: UserSlot): Observable<Response_Type<UserSlot>> {
    return of(pBody);
  }

  readLastVersionFeatures(pBody: { ID: number; LASTVERSIONREAD: string }): Observable<Response_Type<User_Model>> {
    const vUrl = this.PROFIL_API_URL + 'Upd';
    return this.apiservice.postService(vUrl, pBody);
  }
}
