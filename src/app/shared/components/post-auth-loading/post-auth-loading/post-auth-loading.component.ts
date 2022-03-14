import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'post-auth-loading',
  templateUrl: './post-auth-loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAuthLoadingComponent {
  @Input() isVisible: boolean = false;
}
