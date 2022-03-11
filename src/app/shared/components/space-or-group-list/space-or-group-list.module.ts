import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceOrGroupListComponent } from './space-or-group-list.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { PictureModule } from '../picture/picture.module';
import { PhotoByUpnModule } from '../../pipes/photo-by-upn/photo-by-upn.module';
import { SortByAdminModule } from '../../pipes/sort-by-admin/sort-by-admin.module';

@NgModule({
  declarations: [SpaceOrGroupListComponent],
  imports: [CommonModule, SvgIconModule, MatRippleModule, RouterModule, PictureModule, PhotoByUpnModule, SortByAdminModule],
  exports: [SpaceOrGroupListComponent]
})
export class SpaceOrGroupListModule {}
