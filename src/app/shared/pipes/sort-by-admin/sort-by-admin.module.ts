import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByAdminPipe } from './sort-by-admin.pipe';



@NgModule({
  declarations: [
    SortByAdminPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByAdminPipe
  ]
})
export class SortByAdminModule { }
