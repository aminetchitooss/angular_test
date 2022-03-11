import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, App_Config } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(APP_CONFIG) private config: App_Config) {}
  isLogeddIn(): boolean {
    const isAuthenticated = localStorage['save'] == 'true';
    return isAuthenticated;
  }

  rememberDevice(): void {
    localStorage['save'] = true;
  }

  loginWithHint(loginHint: string) {
    localStorage.setItem('URL_HISTORY', this.getRedirectBeforeLogin());
    localStorage.setItem('LOGIN_PENDING', 'IN_PROGRESS');
    const hint: any = { loginHint };
  }

  refreshToken(pUrl: string): void {
    console.error('hnaaaaa redirect');
  }

  private getRedirectBeforeLogin(): string {
    return decodeURIComponent(window.location.href.indexOf('redirectURL=') > -1 ? window.location.href.split('redirectURL=')[1] : this.config.defaultRoute);
  }

  getRedirectAfterLogin(): string {
    var savedlink = localStorage.getItem('URL_HISTORY');
    if (!savedlink) return decodeURIComponent(this.config.defaultRoute);
    return savedlink;
  }

  logoutPostRedirect() {
    this.clearStorage();
    window.location.reload();
  }

  clearStorage() {
    const vListSavedLocalStorage = this.getImportantLocalStorage();
    localStorage.clear();
    this.setImportantLocalStorage(vListSavedLocalStorage);
  }

  private getImportantLocalStorage(): Map<string, string> {
    const vMap = new Map();
    for (const key of Object.keys(localStorage)) {
      if (this.config.keysToSave.some((k) => key.toLowerCase().indexOf(k.toLowerCase()) > -1)) vMap.set(key, localStorage[key]);
    }
    return vMap;
  }

  private setImportantLocalStorage(pList: Map<string, string>): void {
    for (const [k, v] of pList.entries()) {
      localStorage[k] = v;
    }
  }
}
