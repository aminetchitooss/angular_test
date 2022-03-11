import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGroupFormComponent } from './modal-group-form.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SpaceFieldsComponent } from './space-fields/space-fields.component';
import { MatMenuModule } from '@angular/material/menu';
import { PictureModule } from '../picture/picture.module';
import { PhotoByUpnModule } from '../../pipes/photo-by-upn/photo-by-upn.module';
import { GroupLabelPipe } from './group-label.pipe';
import { SortUsersPipe } from './sort-users.pipe';

@NgModule({
  declarations: [ModalGroupFormComponent, SpaceFieldsComponent, GroupLabelPipe, SortUsersPipe],
  imports: [
    CommonModule,
    SvgIconModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    PictureModule,
    MatMenuModule,
    PhotoByUpnModule
  ],
  exports: [ModalGroupFormComponent]
})
export class ModalGroupFormModule {}
