import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {
  constructor(private dialog: MatDialog) {}

  openGenericModal(component: ComponentType<any>, config: MatDialogConfig, blurEnabled = true): MatDialogRef<any, any> {
    const container: HTMLElement | null = blurEnabled ? document.getElementById('dashContainer') : null;

    if (container) container.style.filter = 'blur(3px)';

    const vConfig: MatDialogConfig = {
      ...config,
      panelClass: config.panelClass ?? 'default-dialog',
      autoFocus: config.autoFocus ?? false,
      width: config.width ?? '95%',
      maxWidth: config.maxWidth ?? '650px',
      maxHeight: config.maxHeight ?? '90%'
    };

    const dialogRef = this.dialog.open(component, vConfig);
    const vClass = Array.isArray(vConfig.panelClass) ? vConfig.panelClass[0] : vConfig.panelClass;

    if (vClass) {
      dialogRef.backdropClick().subscribe(() => {
        if (!vConfig.disableClose && document.getElementsByClassName(vClass).length > 0) document.getElementsByClassName(vClass)[0].classList.add('out');
      });
      dialogRef.beforeClosed().subscribe(() => {
        if (document.getElementsByClassName(vClass).length > 0) document.getElementsByClassName(vClass)[0].classList.add('out');
      });
    }
    dialogRef.afterClosed().subscribe(() => {
      if (container) container.style.filter = 'blur(0px)';
    });
    return dialogRef;
  }
}
