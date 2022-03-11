import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotifService {
  constructor(private toastaService: ToastrService) {}

  showError(message?: string, ptitle?: string) {
    this.vibrate();
    this.toastaService.error(message, ptitle ?? 'Erreur!', { progressAnimation: 'decreasing' });
  }

  private vibrate() {
    if (window.navigator.vibrate && window.navigator.vibrate(100)) {
      setTimeout(() => {
        window.navigator?.vibrate([200, 30, 100, 30]);
      }, 10);
    }
  }

  showSuccess(message: string, ptitle?: string, pTimeout?: number) {
    this.toastaService.success(message, ptitle ?? 'Succès!');
  }

  showWarning(message: string, ptitle?: string) {
    this.toastaService.warning(message, ptitle ?? 'Attention!');
  }
}
