import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { YToTop } from 'src/app/shared/animations/animation';
import { GroupService } from 'src/app/shared/api/group.service';
import { Group_Model } from 'src/app/shared/models/models';
import { DataService } from 'src/app/shared/services/data.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [YToTop]
})
export class SettingsComponent implements OnInit {
  isSiteDisabled = true;
  currentIndex = 0;
  isManager = true;
  isLoadedGroup = false;
  isLoadedSpace = false;
  siteList = [
    { id: 1, name: 'Avengers tower' },
    { id: 2, name: 'Guardians' }
  ];
  currentSiteId = 1;
  currentUser$: Observable<User_Model>;

  groupList: Group_Model[] = [];
  spaceList: Group_Model[] = [];

  constructor(private store: Store<{ user: User_Model }>, private modalService: ModalService, private groupService: GroupService, public _dataService: DataService) {
    this.currentUser$ = store.select('user');
  }

  ngOnInit(): void {
    this.getMyGroups();
  }

  getMyGroups() {
    this.isLoadedGroup = false;
    this.groupList = [];
    this.groupService.getMyGroups().subscribe((res) => {
      this.groupList = res;
      // console.log(res);

      this.isLoadedGroup = true;
    });
  }

  getMySpaces() {
    this.spaceList = [];
    this.isLoadedSpace = false;
    this.groupService.getMySpaces().subscribe((res) => {
      this.spaceList = res;
      // console.log(res);
      this.isLoadedSpace = true;
    });
  }

  openCreateGroupModal(): void {
    this.modalService
      .openCreateGroup()
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((addedGroup) => {
        if (!addedGroup) return;
        addedGroup.data.newAdded = true;
        addedGroup.data.ADMIN = true;
        this.groupList.unshift(addedGroup.data);
      });
  }

  openCreateSpaceModal(): void {
    this.modalService
      .openCreateSpace()
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((addedSpace) => {
        if (!addedSpace) return;
        addedSpace.data.newAdded = true;
        addedSpace.data.ADMIN = true;
        this.spaceList.unshift(addedSpace.data);
      });
  }

  changeTab(pIndex: number) {
    // console.log(pIndex);
    this.currentIndex = pIndex;
    this[pIndex == 0 ? 'getMyGroups' : 'getMySpaces']();
  }

  changeSite(pSite: MatSelectChange) {
    // console.log(pSite);
  }
}
