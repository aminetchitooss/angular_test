import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayinMonthPipe } from './dayin-month.pipe';



@NgModule({
  declarations: [
    DayinMonthPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DayinMonthPipe
  ]
})
export class DayinMonthModule { }
