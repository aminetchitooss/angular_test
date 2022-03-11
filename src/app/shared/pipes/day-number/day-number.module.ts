import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayNumberPipe } from './day-number.pipe';



@NgModule({
  declarations: [
    DayNumberPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DayNumberPipe
  ]
})
export class DayNumberModule { }
