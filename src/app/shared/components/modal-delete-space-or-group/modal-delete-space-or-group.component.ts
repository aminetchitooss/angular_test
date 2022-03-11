import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../../api/group.service';
import { Group_Data_Modal, GROUP_TYPE } from '../../models/models';
import { ToastNotifService } from '../../services/toast-notif.service';

@Component({
  selector: 'modal-delete-space-or-group',
  templateUrl: './modal-delete-space-or-group.component.html',
  styleUrls: ['./modal-delete-space-or-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDeleteSpaceOrGroupComponent implements OnInit {
  TITLE: string;
  CONFIRMATION_TEXT: string;
  CONFIRMATION_TEXT_BIS: string;
  isLoading = false;
  isGroup = false;
  constructor(
    private dialogRef: MatDialogRef<ModalDeleteSpaceOrGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public groupDialogData: Group_Data_Modal,
    private groupService: GroupService,
    private toastService: ToastNotifService
  ) {
    this.isGroup = groupDialogData.type == GROUP_TYPE.Group;
    this.TITLE = groupDialogData.type == GROUP_TYPE.Group ? 'Supprimer' : 'Supprimer';

    this.CONFIRMATION_TEXT_BIS =
      groupDialogData.type == GROUP_TYPE.Group
        ? 'En le supprimant vous ne serez plus en mesure de consulter la disponibilité des membres.'
        : 'Les jauges en lien avec cet Espace/Zone ne seront plus disponibles, et il ne sera plus possible de visualiser les présences des membres de cet Espace/Zone.';
    this.CONFIRMATION_TEXT = groupDialogData.type == GROUP_TYPE.Group ? `Êtes vous certain de supprimer le Groupe/Equipe ` : `Êtes vous certain de supprimer cet Espace/Zone `;
  }

  ngOnInit(): void {}

  deleteItem(elm: HTMLDivElement) {
    if (this.isLoading) return;
    elm.classList.add('loading');
    this.isLoading = true;
    this.groupService.deleteSpaceOrGroup(this.groupDialogData.data.ID).subscribe((res) => {
      if (res?.error) {
        this.toastService.showError("Erreur dans l'API" + res.error);
        elm.classList.remove('loading');
        this.isLoading = false;
      } else {
        this.toastService.showSuccess(this.isGroup ? 'Groupe/Equipe supprimé' : 'Espace/Zone supprimé');
        this.close(true);
      }
    });
  }

  close(pIsDeleted = false) {
    this.dialogRef.close(pIsDeleted);
  }
}
