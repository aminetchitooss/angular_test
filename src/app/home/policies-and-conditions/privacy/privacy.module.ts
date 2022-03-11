import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';
import { MatRippleModule } from '@angular/material/core';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, PrivacyRoutingModule, MatRippleModule, SvgIconModule, TranslateModule]
})
export class PrivacyModule {}
