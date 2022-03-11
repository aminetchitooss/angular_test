import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/shared/api/group.service';
import { Group_Model, GROUP_TYPE } from 'src/app/shared/models/models';
import { User_Model } from 'src/app/shared/store/user/user.model';
@Component({
  selector: 'space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {
  isLoaded = false;
  spaceList: Group_Model[] = [];
  currentUser$: Observable<User_Model>;

  constructor(private _groupService: GroupService, private _store: Store<{ user: User_Model }>) {
    this.currentUser$ = _store.select('user');
  }

  ngOnInit(): void {
    this._groupService.getMySpaces().subscribe((data) => {
      if (data?.error) return;
      this.spaceList = data.filter((group) => group.TYP == GROUP_TYPE.Space);
      this.isLoaded = true;
    });
  }
}
