import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

const isIE: boolean = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isIE: boolean = isIE;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(public updates: SwUpdate, public translate: TranslateService) {
    this.translate.addLangs(['fr', 'en']);
    // let browserLang: string | undefined = translate.getBrowserLang();
    // this.translate.use(browserLang == 'en' ? 'en' : 'fr');
    this.translate.use('fr');

    if (updates.isEnabled) interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate().then(() => console.log('checking for updates')));
    this.checkForUpdates();
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe((event) => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
