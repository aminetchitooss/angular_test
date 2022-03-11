import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesAndConditionsRoutingModule } from './policies-and-conditions-routing.module';
import { PoliciesAndConditionsComponent } from './policies-and-conditions/policies-and-conditions.component';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [PoliciesAndConditionsComponent],
  imports: [CommonModule, PoliciesAndConditionsRoutingModule, SvgIconModule, MatRippleModule]
})
export class PoliciesAndConditionsModule {}
