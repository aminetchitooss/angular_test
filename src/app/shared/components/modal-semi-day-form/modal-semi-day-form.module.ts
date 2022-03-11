import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSemiDayFormComponent } from './modal-semi-day-form.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ModalSemiDayFormComponent],
  imports: [CommonModule, SvgIconModule, MatRadioModule, FormsModule],
  exports: [ModalSemiDayFormComponent]
})
export class ModalSemiDayFormModule {}
