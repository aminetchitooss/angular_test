import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GroupService } from '../../api/group.service';
import { Group_Model, GROUP_TYPE } from '../../models/models';
import { ModalService } from '../../services/modal.service';
import { User_Model } from '../../store/user/user.model';

@Component({
  selector: 'space-or-group-list',
  templateUrl: './space-or-group-list.component.html'
})
export class SpaceOrGroupListComponent implements OnInit {
  @Input() isGroup: boolean = false;
  @Input() elementList: Group_Model[] = [];
  loaderList = Array(5);
  GROUP_TYPE = GROUP_TYPE;
  @Input() set isLoaded(data: boolean) {
    this.loaderList = data ? [] : Array(5);
  }
  isMobileNav: boolean;
  public group_Model = (item: Group_Model) => item;

  currentUser$: Observable<User_Model>;
  constructor(private store: Store<{ user: User_Model }>, private _modalService: ModalService, private _groupService: GroupService, private _router: Router) {
    this.isMobileNav = this._router.url.indexOf('-list') > -1;
    this.currentUser$ = store.select('user');
  }

  ngOnInit(): void {}

  editElement(pData: Group_Model, elm: HTMLDivElement, pIndex: number) {
    if (this._router.url.indexOf('-list') > -1) {
      this._router.navigate([`/home/${pData.TYP == GROUP_TYPE.Group ? 'group' : 'space'}-list/edit/${pData.ID}`]);
      return;
    }
    elm.classList.add('loading');

    this._groupService.getGroupOrSpaceById(pData.ID).subscribe((data: Group_Model) => {
      elm.classList.remove('loading');

      const body = {
        type: this.isGroup ? GROUP_TYPE.Group : GROUP_TYPE.Space,
        data
      };
      this._modalService
        .editSpaceOrGroup(body)
        .afterClosed()
        .pipe(filter((res) => !!res))
        .subscribe((editedGroup) => {
          if (!editedGroup) return;
          if (editedGroup.isDeleted) {
            this.elementList.splice(pIndex, 1);
            return;
          }
          pData.ADMIN = editedGroup.data.ADMIN;
          pData.NBMAX = editedGroup.data.NBMAX;
          pData.NAME = editedGroup.data.NAME;
          pData.MEMBER_LIST = editedGroup.data.MEMBER_LIST;
          pData.newAdded = true;
        });
    });
  }
}
