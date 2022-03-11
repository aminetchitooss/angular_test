import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashweekFormatPipe } from './dashweek-format.pipe';



@NgModule({
  declarations: [
    DashweekFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashweekFormatPipe
  ]
})
export class DashweekFormatModule { }
