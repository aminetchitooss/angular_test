import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemiDayMenuTitlePipe } from './semi-day-menu-title.pipe';



@NgModule({
  declarations: [
    SemiDayMenuTitlePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SemiDayMenuTitlePipe
  ]
})
export class SemiDayMenuTitleModule { }
