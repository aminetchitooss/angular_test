import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../global-utils/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedOnce = isLoggedIn();
    if (isLoggedOnce) return true;

    const isAzureRedirect: boolean = listAzureRediect.some((link) => state.url.indexOf(link) > -1);
    const vRedirectUrl: string = isAzureRedirect ? '' : state.url;
    this.logout(vRedirectUrl);
    return false;
  }

  logout(param: string) {
    if (param == '') {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login'], { queryParams: { redirectURL: param } });
    }
  }
}
const listAzureRediect: string[] = ['error', 'code'];
