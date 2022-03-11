import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ModalGroupFormModule } from 'src/app/shared/components/modal-group-form/modal-group-form.module';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';
import { SpaceOrGroupListModule } from 'src/app/shared/components/space-or-group-list/space-or-group-list.module';
import { SpaceOrGroupDetailModule } from 'src/app/shared/components/space-or-group-detail/space-or-group-detail.module';

@NgModule({
  declarations: [GroupListComponent],
  imports: [CommonModule, GroupRoutingModule, ModalGroupFormModule, SvgIconModule, MatRippleModule, SpaceOrGroupListModule, SpaceOrGroupDetailModule]
})
export class GroupModule {}
