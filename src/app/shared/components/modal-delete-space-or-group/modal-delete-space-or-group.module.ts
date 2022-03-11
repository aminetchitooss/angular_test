import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteSpaceOrGroupComponent } from './modal-delete-space-or-group.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ModalDeleteSpaceOrGroupComponent],
  imports: [CommonModule, SvgIconModule, MatRippleModule],
  exports: [ModalDeleteSpaceOrGroupComponent]
})
export class ModalDeleteSpaceOrGroupModule {}
