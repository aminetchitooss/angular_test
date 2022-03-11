import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityInfoPipe } from './activity-info.pipe';

@NgModule({
  declarations: [ActivityInfoPipe],
  imports: [CommonModule],
  exports: [ActivityInfoPipe]
})
export class ActivityInfoModule {}
