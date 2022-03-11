import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNewFeaturesComponent } from './modal-new-features/modal-new-features.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [ModalNewFeaturesComponent],
  imports: [CommonModule, SvgIconModule],
  exports: [ModalNewFeaturesComponent]
})
export class ModalNewFeaturesModule {}
