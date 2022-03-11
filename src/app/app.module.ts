import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './shared/services/intercept.service';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './shared/store/user/user.reducer';
import { ModalGroupFormModule } from './shared/components/modal-group-form/modal-group-form.module';
import { ModalDeleteSpaceOrGroupModule } from './shared/components/modal-delete-space-or-group/modal-delete-space-or-group.module';
import { ModalSemiDayFormModule } from './shared/components/modal-semi-day-form/modal-semi-day-form.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ModalNewFeaturesModule } from './shared/components/modal-new-features/modal-new-features.module';
import { ModalRemoveFromGroupModule } from './shared/components/modal-remove-from-group/modal-remove-from-group.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalGroupFormModule,
    ModalDeleteSpaceOrGroupModule,
    ModalSemiDayFormModule,
    ModalNewFeaturesModule,
    ModalRemoveFromGroupModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({ user: userReducer })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
