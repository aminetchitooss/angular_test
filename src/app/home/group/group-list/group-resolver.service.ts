import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Group_Data_Modal, GROUP_TYPE } from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class GroupResolverService implements Resolve<Partial<Group_Data_Modal>> {
  constructor() {}
  resolve(): Observable<Partial<Group_Data_Modal>> {
    return of({ type: GROUP_TYPE.Group });
  }
}
