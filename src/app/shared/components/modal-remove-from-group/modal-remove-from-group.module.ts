import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRemoveFromGroupComponent } from './modal-remove-from-group/modal-remove-from-group.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [ModalRemoveFromGroupComponent],
  imports: [CommonModule, SvgIconModule],
  exports: [ModalRemoveFromGroupComponent]
})
export class ModalRemoveFromGroupModule {}
