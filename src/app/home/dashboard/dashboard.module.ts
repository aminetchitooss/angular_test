import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SvgIconModule } from 'src/app/shared/components/svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';
import { CalendarElementModule } from 'src/app/shared/components/calendar-element/calendar-element.module';
import { MultipleStatusModule } from 'src/app/shared/pipes/multiple-status/multiple-status.module';
import { MatMenuModule } from '@angular/material/menu';
import { SpaceDataPipe } from './pipes/space-data.pipe';
import { ProgressBarModule } from 'src/app/shared/components/progress-bar/progress-bar.module';
import { SpaceCardsComponent } from './space-cards/space-cards.component';
import { ConstructionModule } from 'src/app/shared/components/construction/construction.module';
import { IsTodayModule } from 'src/app/shared/pipes/is-today/is-today.module';
import { DashweekFormatModule } from 'src/app/shared/pipes/dashweek-format/dashweek-format.module';
import { SemiDayMenuTitleModule } from 'src/app/shared/pipes/semi-day-menu-title/semi-day-menu-title.module';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  declarations: [DashboardComponent, SpaceDataPipe, SpaceCardsComponent, RoundPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SvgIconModule,
    MatRippleModule,
    CalendarElementModule,
    MultipleStatusModule,
    MatMenuModule,
    ProgressBarModule,
    ConstructionModule,
    IsTodayModule,
    DashweekFormatModule,
    SemiDayMenuTitleModule
  ]
})
export class DashboardModule {}
