import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CguRoutingModule } from './cgu-routing.module';
import { CguComponent } from './cgu.component';
import { MatRippleModule } from '@angular/material/core';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CguComponent],
  imports: [CommonModule, CguRoutingModule, MatRippleModule, SvgIconModule, TranslateModule]
})
export class CguModule {}
