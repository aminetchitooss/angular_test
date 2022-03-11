import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/shared/api/group.service';
import { RemoveFrom_Group_Model } from 'src/app/shared/models/models';

@Component({
  selector: 'modal-remove-from-group',
  templateUrl: './modal-remove-from-group.component.html',
  styleUrls: ['./modal-remove-from-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalRemoveFromGroupComponent implements OnInit {
  isLoading = false;

  constructor(private _groupService: GroupService, @Inject(MAT_DIALOG_DATA) public data: RemoveFrom_Group_Model, private _dialogRef: MatDialogRef<ModalRemoveFromGroupComponent>) {}

  ngOnInit(): void {}

  leave(elm: HTMLDivElement) {
    if (this.isLoading) return;
    elm.classList.add('loading');
    this.isLoading = true;
    if (this.data.isAdminDeleted) {
      this.close(true);
      return;
    }
    this._groupService.removeMyself(this.data.groupId).subscribe((res) => {
      debugger;
      if (res.error) {
        elm.classList.remove('loading');
        this.isLoading = false;
        this.close(false);
      } else this.close(true);
    });
  }

  close(pRes: any = undefined) {
    this._dialogRef.close(pRes);
  }
}
