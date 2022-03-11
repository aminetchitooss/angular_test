import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullDayStatusPipe } from './full-day-status.pipe';

@NgModule({
  declarations: [FullDayStatusPipe],
  imports: [CommonModule],
  exports: [FullDayStatusPipe]
})
export class FullDayStatusModule {}
