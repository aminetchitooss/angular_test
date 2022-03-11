import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceOrGroupDetailComponent } from './space-or-group-detail.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { RouterModule } from '@angular/router';
import { MultipleStatusModule } from '../../pipes/multiple-status/multiple-status.module';
import { ActivityInfoModule } from '../../pipes/activity-info/activity-info.module';
import { PictureModule } from '../picture/picture.module';
import { StatusClassModule } from '../../pipes/status-class/status-class.module';

@NgModule({
  declarations: [SpaceOrGroupDetailComponent],
  imports: [CommonModule, SvgIconModule, RouterModule, MultipleStatusModule, ActivityInfoModule, PictureModule, StatusClassModule],
  exports: [SpaceOrGroupDetailComponent]
})
export class SpaceOrGroupDetailModule {}
