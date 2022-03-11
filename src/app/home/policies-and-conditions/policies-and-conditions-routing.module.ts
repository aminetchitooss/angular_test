import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesAndConditionsComponent } from './policies-and-conditions/policies-and-conditions.component';

const routes: Routes = [
  { path: '', component: PoliciesAndConditionsComponent, data: { animation: 'ParentContainer', preload: false } },
  { path: 'cgu', loadChildren: () => import('./cgu/cgu.module').then((m) => m.CguModule), data: { animation: 'ChildContainer', preload: false } },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then((m) => m.PrivacyModule), data: { animation: 'ChildContainer', preload: false } },
  { path: 'cookies', loadChildren: () => import('./cookies/cookies.module').then((m) => m.CookiesModule), data: { animation: 'ChildContainer', preload: false } },
  { path: 'legal', loadChildren: () => import('./legal/legal.module').then((m) => m.LegalModule), data: { animation: 'ChildContainer', preload: false } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesAndConditionsRoutingModule {}
