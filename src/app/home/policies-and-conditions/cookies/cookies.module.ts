import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookiesRoutingModule } from './cookies-routing.module';
import { CookiesComponent } from './cookies.component';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CookiesComponent],
  imports: [CommonModule, CookiesRoutingModule, SvgIconModule, TranslateModule]
})
export class CookiesModule {}
