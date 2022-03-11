import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { YToTop } from 'src/app/shared/animations/animation';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PreloadService } from 'src/app/shared/services/preload.service';

@Component({
  selector: 'underside-nav',
  templateUrl: './underside-nav.component.html',
  styleUrls: ['./underside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [YToTop]
})
export class UndersideNavComponent {
  @Output() closeDrawer: any = new EventEmitter<void>();
  constructor(private authService: AuthService, private preloadService: PreloadService) {}

  switchRoute() {
    this.closeDrawer.emit();
  }

  logout() {
    this.authService.logoutPostRedirect();
  }

  startPreload() {
    this.preloadService.startpreload('policies');
  }
}
