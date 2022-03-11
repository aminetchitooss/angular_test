import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEFAULT_ROUTE } from '../shared/global-utils/constants';
import { UserGuard } from '../shared/guards/user.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule), data: { preload: false } },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), data: { preload: false } },

      {
        path: 'policies',
        loadChildren: () => import('./policies-and-conditions/policies-and-conditions.module').then((m) => m.PoliciesAndConditionsModule),
        data: { preload: false }
      },
      { path: 'group-list', loadChildren: () => import('./group/group.module').then((m) => m.GroupModule), data: { preload: false } },
      { path: 'space-list', loadChildren: () => import('./space/space.module').then((m) => m.SpaceModule), data: { preload: false } },

      // { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), canActivate: [AdminGuard], data: { preload: false } },

      { path: '**', redirectTo: DEFAULT_ROUTE }
    ],
    canActivate: [UserGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
