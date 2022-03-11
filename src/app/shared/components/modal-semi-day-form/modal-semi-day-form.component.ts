import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../api/user.service';
import { getDate, getMonthInLetter } from '../../global-utils/functions';
import { STATUS_TYPE, STATUS_TYPE_LABEL_LONG, UserSlot } from '../../models/models';
import { ToastNotifService } from '../../services/toast-notif.service';

@Component({
  selector: 'modal-semi-day-form',
  templateUrl: './modal-semi-day-form.component.html',
  styleUrls: ['./modal-semi-day-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalSemiDayFormComponent implements OnInit {
  Status_List = [
    { Id: STATUS_TYPE.Presential, name: STATUS_TYPE_LABEL_LONG.Presential },
    { Id: STATUS_TYPE.Distance, name: STATUS_TYPE_LABEL_LONG.Distance },
    { Id: STATUS_TYPE.Absent, name: STATUS_TYPE_LABEL_LONG.Absent }
  ];
  isLoading = false;
  date: string;
  morning: STATUS_TYPE | null = STATUS_TYPE.None;
  afternoon: STATUS_TYPE | null = STATUS_TYPE.None;
  fullDay: STATUS_TYPE | null = STATUS_TYPE.None;
  TITLE = 'Déclarer';
  isMultiple: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ModalSemiDayFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userSlotData: UserSlot,
    private userService: UserService,
    private toastNotifService: ToastNotifService
  ) {
    this.date = this.transformDate(this.userSlotData.DATE);
  }

  transformDate(d: string): string {
    const value = getDate(d);
    return [value.getDate(), getMonthInLetter(value), value.getFullYear()].join(' ');
  }

  ngOnInit(): void {
    // console.log('from modal', this.userSlotData);
    this.isMultiple = this.userSlotData.STATUS_TYPE_AFTER_NOON != this.userSlotData.STATUS_TYPE_MORNING;

    this.morning = this.isMultiple ? this.userSlotData.STATUS_TYPE_MORNING : this.userSlotData.STATUS_TYPE;
    this.afternoon = this.isMultiple ? this.userSlotData.STATUS_TYPE_AFTER_NOON : this.userSlotData.STATUS_TYPE;
    if (!this.isMultiple) {
      this.userSlotData.STATUS_TYPE_AFTER_NOON = this.userSlotData.STATUS_TYPE;
      this.userSlotData.STATUS_TYPE_MORNING = this.userSlotData.STATUS_TYPE;
    } else {
      this.TITLE = 'Modifier';
    }
  }

  updateSemiDays(): void {
    this.morning = this.fullDay;
    this.afternoon = this.fullDay;
  }

  updateFullday(): void {
    console.count('yeah its');

    if (this.morning == this.afternoon) this.fullDay = this.morning;
    else this.fullDay = STATUS_TYPE.None;
  }

  close(pUpdatedUserSlot: UserSlot | null = null) {
    this.dialogRef.close(pUpdatedUserSlot);
  }

  isFilled(): boolean {
    return this.morning !== null && this.morning !== STATUS_TYPE.None && this.afternoon !== null && this.afternoon !== STATUS_TYPE.None;
  }

  hasChanged(): boolean {
    return this.isFilled() && (this.morning !== this.userSlotData.STATUS_TYPE_MORNING || this.afternoon !== this.userSlotData.STATUS_TYPE_AFTER_NOON);
  }

  save(elm: HTMLDivElement) {
    if (!this.hasChanged()) return;
    if (this.isLoading) return;
    elm.classList.add('loading');
    this.isLoading = true;
    const isFullDay = this.morning == this.afternoon;

    const vBody: UserSlot = {
      ...this.userSlotData,
      STATUS_TYPE: isFullDay ? this.morning : this.userSlotData.STATUS_TYPE ?? STATUS_TYPE.None,
      STATUS_TYPE_MORNING: isFullDay ? STATUS_TYPE.None : this.morning,
      STATUS_TYPE_AFTER_NOON: isFullDay ? STATUS_TYPE.None : this.afternoon
    };
    // console.log(vBody);

    this.userService.updateDaySlotStatus(vBody).subscribe((res) => {
      if (res.error) this.toastNotifService.showError('Error in updating semi day slot status');
      else this.close(vBody);
    });
  }
}
