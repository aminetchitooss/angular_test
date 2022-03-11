import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveWeekendsPipe } from './remove-weekends.pipe';



@NgModule({
  declarations: [
    RemoveWeekendsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RemoveWeekendsPipe
  ]
})
export class RemoveWeekendsModule { }
