import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthDateFormatPipe } from './month-date-format.pipe';

@NgModule({
  declarations: [MonthDateFormatPipe],
  imports: [CommonModule],
  exports: [MonthDateFormatPipe]
})
export class MonthDateFormatModule {}
