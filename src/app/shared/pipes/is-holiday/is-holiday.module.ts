import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsHolidayPipe } from './is-holiday.pipe';



@NgModule({
  declarations: [
    IsHolidayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsHolidayPipe
  ]
})
export class IsHolidayModule { }
