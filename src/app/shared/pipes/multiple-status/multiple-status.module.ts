import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleStatusPipe } from './multiple-status.pipe';

@NgModule({
  declarations: [MultipleStatusPipe],
  imports: [CommonModule],
  exports: [MultipleStatusPipe]
})
export class MultipleStatusModule {}
