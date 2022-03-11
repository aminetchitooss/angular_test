import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusClassPipe } from './status-class.pipe';



@NgModule({
  declarations: [
    StatusClassPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusClassPipe
  ]
})
export class StatusClassModule { }
