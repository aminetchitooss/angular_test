import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalDeleteSpaceOrGroupComponent } from '../components/modal-delete-space-or-group/modal-delete-space-or-group.component';
import { ModalGroupFormComponent } from '../components/modal-group-form/modal-group-form.component';
import { ModalRemoveFromGroupComponent } from '../components/modal-remove-from-group/modal-remove-from-group/modal-remove-from-group.component';
import { ModalSemiDayFormComponent } from '../components/modal-semi-day-form/modal-semi-day-form.component';
import { Edit_Group_Model, Group_Data_Modal, Group_Model, GROUP_TYPE, RemoveFrom_Group_Model, UserSlot } from '../models/models';
import { DialogModalService } from './dialog-modal.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialogService: DialogModalService) {}

  openCreateGroup(): MatDialogRef<any, Edit_Group_Model> {
    const data: Partial<Group_Data_Modal> = {
      type: GROUP_TYPE.Group
    };
    return this.openGroupForm(data);
  }

  openCreateSpace(): MatDialogRef<any, Edit_Group_Model> {
    const data: Partial<Group_Data_Modal> = {
      type: GROUP_TYPE.Space
    };
    return this.openGroupForm(data);
  }

  editSpaceOrGroup(data: Group_Data_Modal): MatDialogRef<any, Edit_Group_Model> {
    return this.openGroupForm(data);
  }

  openGroupForm(data: Partial<Group_Data_Modal>) {
    return this.dialogService.openGenericModal(ModalGroupFormComponent, {
      width: '95%',
      maxWidth: '785px',
      maxHeight: '90vh',
      data
    });
  }

  openDeleteSpaceOrGroupModal(groupOrSpace: Group_Model, isGroup = false): MatDialogRef<any, boolean> {
    const data: Group_Data_Modal = {
      type: isGroup ? GROUP_TYPE.Group : GROUP_TYPE.Space,
      data: groupOrSpace
    };
    return this.dialogService.openGenericModal(
      ModalDeleteSpaceOrGroupComponent,
      {
        panelClass: 'confirmation-dialog',
        width: '95%',
        maxWidth: '650px',
        maxHeight: '850px',
        data: data
      },
      false
    );
  }

  openRemoveFromGroupModal(data: RemoveFrom_Group_Model): MatDialogRef<any, boolean | undefined> {
    return this.dialogService.openGenericModal(
      ModalRemoveFromGroupComponent,
      {
        panelClass: 'confirmation-dialog',
        width: '95%',
        maxWidth: '650px',
        maxHeight: '850px',
        data
      },
      false
    );
  }

  addOrUpdateSemiDayStatus(data: UserSlot): MatDialogRef<any, UserSlot | null> {
    const isMultiple = data.STATUS_TYPE_AFTER_NOON != data.STATUS_TYPE_MORNING;
    return this.dialogService.openGenericModal(ModalSemiDayFormComponent, {
      panelClass: 'confirmation-dialog',
      maxWidth: isMultiple ? '705px' : '585px',
      maxHeight: '95%',
      data
    });
  }
}
