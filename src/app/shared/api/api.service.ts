import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { APP_CONFIG, App_Config } from '../../app.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL: string;
  LOCAL_URL = './assets/mydata.json';
  constructor(private http: HttpClient, private authService: AuthService, @Inject(APP_CONFIG) private _config: App_Config) {
    this.BASE_URL = this._config.baseUrl;
  }

  getService(pUrl: string, bypass = false, pTakeFirst = true): Observable<any> {
    const vUrl = bypass ? pUrl : this.BASE_URL + pUrl;
    return this.handleService(this.http.get(vUrl), vUrl, pTakeFirst);
  }

  postService(pUrl: string, pBody: any): Observable<any> {
    const vUrl = this.BASE_URL + pUrl;
    return this.handleService(this.http.post(vUrl, pBody), vUrl);
  }

  putService(pUrl: string, pBody: any): Observable<any> {
    const vUrl = this.BASE_URL + pUrl;
    return this.handleService(this.http.put(vUrl, pBody), vUrl);
  }

  deleteService(pUrl: string): Observable<any> {
    const vUrl = this.BASE_URL + pUrl;
    return this.handleService(this.http.delete(vUrl), vUrl);
  }

  downloadService(pUrl: string, bypass = false): Observable<any> {
    const vUrl = bypass ? pUrl : this.BASE_URL + pUrl;
    return this.handleService(this.http.get(vUrl, { responseType: 'blob' }), vUrl);
  }

  getBase64Service(pUrl: string, bypass = false): Observable<any> {
    const vUrl = bypass ? pUrl : this.BASE_URL + pUrl;
    return this.handleService(this.http.get(vUrl, { responseType: 'text' }), vUrl, false);
  }

  handleService(pService: Observable<any>, vUrl: string, pFirst = true): Observable<any> {
    return pService.pipe(
      map((res) => this.handleResponse(res, pFirst)),
      // retryWhen((errors) =>
      //   errors.pipe(
      //     tap((errorStatus) => {
      //       debugger;
      //       if (this.isExceptionError(errorStatus)) {
      //         this.exitRetry(errorStatus);
      //       } else {
      //         console.log('Retrying...');
      //         this.authService.refreshToken(vUrl);
      //       }
      //     })
      //   )
      // ),
      catchError((err) => {
        return of(err);
      })
    );
  }

  exitRetry(errorStatus: any) {
    throw errorStatus;
  }

  isExceptionError(errorStatus: any) {
    return errorStatus.status === 0 || errorStatus.status >= 400;
  }

  handleResponse(res: any, pFirst: boolean): any {
    if (pFirst) return res[0];
    return res;
  }

  getLocalDataService(bypass = true): Observable<any> {
    if (bypass) return this.http.get(this.LOCAL_URL);
    const _placeholder: Observable<any> = this.http.get(this.BASE_URL);
    return _placeholder.pipe(
      delay(500),
      mergeMap(() => {
        return this.http.get(this.LOCAL_URL);
      })
    );
  }
}
