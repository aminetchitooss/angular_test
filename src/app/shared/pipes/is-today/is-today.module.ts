import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsTodayPipe } from './is-today.pipe';



@NgModule({
  declarations: [
    IsTodayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsTodayPipe
  ]
})
export class IsTodayModule { }
