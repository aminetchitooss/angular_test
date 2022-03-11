import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpaceListComponent } from './space-list/space-list.component';
import { MatRippleModule } from '@angular/material/core';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { ModalGroupFormModule } from 'src/app/shared/components/modal-group-form/modal-group-form.module';
import { SpaceOrGroupListModule } from 'src/app/shared/components/space-or-group-list/space-or-group-list.module';
import { SpaceOrGroupDetailModule } from 'src/app/shared/components/space-or-group-detail/space-or-group-detail.module';

@NgModule({
  declarations: [SpaceListComponent],
  imports: [CommonModule, SpaceRoutingModule, ModalGroupFormModule, SvgIconModule, MatRippleModule, SpaceOrGroupListModule, SpaceOrGroupDetailModule]
})
export class SpaceModule {}
