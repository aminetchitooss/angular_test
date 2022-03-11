import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { MatSelectModule } from '@angular/material/select';
import { SpaceOrGroupListModule } from 'src/app/shared/components/space-or-group-list/space-or-group-list.module';
@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, MatRippleModule, MatTabsModule, FormsModule, SvgIconModule, MatSelectModule, SpaceOrGroupListModule]
})
export class SettingsModule {}
