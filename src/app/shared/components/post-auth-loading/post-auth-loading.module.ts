import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthLoadingComponent } from './post-auth-loading/post-auth-loading.component';

@NgModule({
  declarations: [PostAuthLoadingComponent],
  imports: [CommonModule],
  exports: [PostAuthLoadingComponent]
})
export class PostAuthLoadingModule {}
