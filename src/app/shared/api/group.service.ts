import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group_Model, GROUP_TYPE, Response_Type } from '../models/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public GROUP_API_URL = '/Api/Groupe/';

  constructor(private apiservice: ApiService) {}

  getMyGroups(): Observable<Response_Type<Group_Model[]>> {
    return this.getAllGroupsAndSpaces().pipe(
      map((groupList: Group_Model[]) => groupList.filter((group) => group.TYP == GROUP_TYPE.Group).sort((a: Group_Model, b: Group_Model) => (!!a.ADMIN < !!b.ADMIN ? 1 : -1)))
    );
  }

  getMySpaces(): Observable<Response_Type<Group_Model[]>> {
    return this.getAllGroupsAndSpaces().pipe(
      map((groupList: Group_Model[]) => groupList.filter((group) => group.TYP == GROUP_TYPE.Space).sort((a: Group_Model, b: Group_Model) => (!!a.ADMIN < !!b.ADMIN ? 1 : -1)))
    );
  }

  getAllGroupsAndSpaces(): Observable<Response_Type<Group_Model[]>> {
    return this.apiservice.getLocalDataService(false).pipe(map((r) => r.SelAsMemberWithMember[0]));

    const vUrl = this.GROUP_API_URL + 'SelAsMemberWithMember';
    return this.apiservice.getService(vUrl);
  }

  addSpaceOrGroup(pBody: Partial<Group_Model>): Observable<Response_Type<Group_Model>> {
    return of({
      ID: 245,
      TYP: 1,
      NAME: 'teste',
      NBSEAT: null,
      NBMAX: null,
      PERCENTMAX: 0,
      MEMBER_LIST: [{ ID: 594, FIRSTNAME: 'Tony', LASTNAME: 'Stark', VISA: 'AMTA_CB', UPN: 'Toni.Stark@avengers.com', ADMIN: true }]
    });
    const vUrl = this.GROUP_API_URL + 'Add';
    return this.apiservice.postService(vUrl, pBody);
  }

  updateSpaceOrGroup(pBody: Partial<Group_Model>): Observable<Response_Type<Group_Model>> {
    const vUrl = this.GROUP_API_URL + 'upd';
    return this.apiservice.postService(vUrl, pBody);
  }

  getGroupOrSpaceById(spaceOrGroupId: number): Observable<Response_Type<Group_Model>> {
    return this.apiservice.getLocalDataService().pipe(map((r) => r.detail[0]));
  }

  deleteSpaceOrGroup(spaceOrGroupId: number): Observable<Response_Type<boolean>> {
    const vUrl = this.GROUP_API_URL + 'Del?id=' + spaceOrGroupId;
    return this.apiservice.getService(vUrl, false, false);
  }

  removeMyself(GroupId: number): Observable<Response_Type<boolean>> {
    return of(true);
  }
}
