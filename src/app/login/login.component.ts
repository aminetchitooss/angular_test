import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { projectVersion } from '../app.config';
import { YToBottom, YToTop } from '../shared/animations/animation';
import { validateEmail } from '../shared/global-utils/functions';
import { AuthService } from '../shared/services/auth.service';
import { ToastNotifService } from '../shared/services/toast-notif.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [YToBottom]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  version = projectVersion;
  loginDisplay: boolean | null = null;

  userNameCtrl = new FormControl('', [Validators.required]);
  nameChangeSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,

    private router: Router,
    private toastNotifService: ToastNotifService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogeddIn()) {
      const vUrlRedirect = this.authService.getRedirectAfterLogin();
      this.router.navigate([vUrlRedirect]);
    } else {
      this.loginDisplay = true;
    }
  }

  ngAfterViewInit(): void {}

  isLoading = false;
  connect(elm: HTMLButtonElement) {
    if (this.isLoading) return;
    elm.classList.add('loading');
    this.isLoading = true;
    if (this.userNameCtrl.valid) {
      this.authService.rememberDevice();
      const vUrlRedirect = this.authService.getRedirectAfterLogin();
      localStorage.setItem('URL_HISTORY', vUrlRedirect);
      localStorage.setItem('accessToken', this.userNameCtrl.value);
      this.router.navigate([vUrlRedirect]);

      this.authService.loginWithHint(this.userNameCtrl.value);
    } else {
      this.toastNotifService.showWarning('Veuillez saisir votre Token');
      elm.classList.remove('loading');
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    if (this.nameChangeSub) this.nameChangeSub.unsubscribe();
  }
}
