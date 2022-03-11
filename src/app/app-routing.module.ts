import { PredictivePreloadingStrategy } from './app.preloadStrategy';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const isIframe = window !== window.parent && !window.opener;

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule), data: { preload: false } },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard], data: { preload: false } },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PredictivePreloadingStrategy,
      useHash: true,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
