import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal.component';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LegalComponent],
  imports: [CommonModule, LegalRoutingModule, SvgIconModule, TranslateModule]
})
export class LegalModule {}
