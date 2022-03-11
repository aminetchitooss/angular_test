import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsMonthDifferentCalendarPipe } from './is-month-different-calendar.pipe';



@NgModule({
  declarations: [
    IsMonthDifferentCalendarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsMonthDifferentCalendarPipe
  ]
})
export class IsMonthDifferentCalendarModule { }
