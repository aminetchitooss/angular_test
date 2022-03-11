import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoByUpnPipe } from './photo-by-upn.pipe';



@NgModule({
  declarations: [
    PhotoByUpnPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhotoByUpnPipe
  ]
})
export class PhotoByUpnModule { }
