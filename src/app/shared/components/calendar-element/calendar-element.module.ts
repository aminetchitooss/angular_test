import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarElementComponent } from './calendar-element.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { FullDayStatusModule } from '../../pipes/full-day-status/full-day-status.module';

@NgModule({
  declarations: [CalendarElementComponent],
  imports: [CommonModule, SvgIconModule, FullDayStatusModule],
  exports: [CalendarElementComponent]
})
export class CalendarElementModule {}
