import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectVersionShort } from 'src/app/app.config';

@Component({
  selector: 'modal-new-features',
  templateUrl: './modal-new-features.component.html',
  styleUrls: ['./modal-new-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalNewFeaturesComponent {
  PROJECT_VERSION = projectVersionShort;
  constructor(private dialogRef: MatDialogRef<ModalNewFeaturesComponent>, @Inject(MAT_DIALOG_DATA) public featureList: string[] = []) {}

  close() {
    this.dialogRef.close();
  }
}
