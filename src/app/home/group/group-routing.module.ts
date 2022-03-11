import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalGroupFormComponent } from 'src/app/shared/components/modal-group-form/modal-group-form.component';
import { SpaceOrGroupDetailComponent } from 'src/app/shared/components/space-or-group-detail/space-or-group-detail.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupResolverEditService } from './group-list/group-resolver-edit.service';
import { GroupResolverService } from './group-list/group-resolver.service';

const routes: Routes = [
  { path: '', component: GroupListComponent, data: { animation: 'ParentContainer' } },
  { path: 'create', component: ModalGroupFormComponent, resolve: { groupData: GroupResolverService }, data: { animation: 'ChildContainer' } },
  { path: 'edit/:id', component: ModalGroupFormComponent, resolve: { groupData: GroupResolverEditService }, data: { animation: 'ChildContainer' } },
  { path: 'detail/:id', component: SpaceOrGroupDetailComponent, data: { animation: 'ChildContainer' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {}
