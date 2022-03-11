import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/shared/api/group.service';
import { Group_Model } from 'src/app/shared/models/models';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  isLoaded = false;
  groupList: Group_Model[] = [];
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getMyGroups().subscribe((res) => {
      this.groupList = res;
      this.isLoaded = true;
    });
  }
}
