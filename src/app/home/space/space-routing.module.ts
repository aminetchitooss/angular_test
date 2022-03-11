import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalGroupFormComponent } from 'src/app/shared/components/modal-group-form/modal-group-form.component';
import { SpaceOrGroupDetailComponent } from 'src/app/shared/components/space-or-group-detail/space-or-group-detail.component';
import { ManagerGuard } from 'src/app/shared/guards/manager.guard';
import { SpaceListComponent } from './space-list/space-list.component';
import { SpaceResolverEditService } from './space-list/space-resolver-edit.service';
import { SpaceResolverService } from './space-list/space-resolver.service';

const routes: Routes = [
  { path: '', component: SpaceListComponent, data: { animation: 'ParentContainer' } },
  { path: 'create', component: ModalGroupFormComponent, resolve: { groupData: SpaceResolverService }, data: { animation: 'ChildContainer' }, canActivate: [ManagerGuard] },
  { path: 'edit/:id', component: ModalGroupFormComponent, resolve: { groupData: SpaceResolverEditService }, data: { animation: 'ChildContainer' } },
  { path: 'detail/:id', component: SpaceOrGroupDetailComponent, data: { animation: 'ChildContainer' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule {}
