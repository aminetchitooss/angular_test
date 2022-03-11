import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutModule } from '@angular/cdk/layout';

import { NavigationModule } from '../shared/components/navigation/navigation.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorUserModule } from '../shared/components/error-user/error-user.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, LayoutModule, FormsModule, NavigationModule, MatProgressSpinnerModule, ErrorUserModule]
})
export class HomeModule {}
