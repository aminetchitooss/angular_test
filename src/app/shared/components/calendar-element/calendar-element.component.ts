import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../api/user.service';
import { WARNING_MSG_UPDATE } from '../../global-utils/constants';
import { getDate, isObjectEmpty, isUnderToday } from '../../global-utils/functions';
import { SemidayData, StatusTypeResult, STATUS_TYPE, STATUS_TYPE_LABEL, UserSlot } from '../../models/models';
import { ModalService } from '../../services/modal.service';
import { ToastNotifService } from '../../services/toast-notif.service';
import { User_Model } from '../../store/user/user.model';

@Component({
  selector: 'calendar-element',
  templateUrl: './calendar-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarElementComponent implements OnInit {
  @Input() currentUser: User_Model = {} as User_Model;

  @Input() statusData: Partial<StatusTypeResult> | undefined;
  @Input() slot: UserSlot = {} as UserSlot;
  @Input() index: number = 0;
  @Input() display: boolean = false;
  @Input() today: string = '';

  @Output() updateStatus: EventEmitter<SemidayData> = new EventEmitter();
  @Output() daySlotUpdated: EventEmitter<number> = new EventEmitter();

  public userSlot = (item: UserSlot) => item;
  public statusType = (item: Partial<StatusTypeResult>) => item;
  STATUS_TYPE = STATUS_TYPE;
  STATUS_TYPE_LABEL = STATUS_TYPE_LABEL;
  constructor(private userService: UserService, private toastNotifService: ToastNotifService, private cdr: ChangeDetectorRef, private modalService: ModalService) {}

  ngOnInit(): void {}

  toggleDaySlotStatus(pSlot: UserSlot, pStatus: STATUS_TYPE, pIndex: number) {
    if (this.isIntern()) return;
    const d = getDate(pSlot.DATE);
    const today = getDate(this.today);
    if (isUnderToday(d, today)) return this.warnNotUpdatable();

    if (pSlot.STATUS_TYPE == pStatus) {
      // console.log('saaame');
      return;
    }

    switch (pStatus) {
      case STATUS_TYPE.Absent:
        this.updateDaySlotStatus(pSlot, STATUS_TYPE.Absent, pIndex);
        break;
      case STATUS_TYPE.Distance:
        this.updateDaySlotStatus(pSlot, STATUS_TYPE.Distance, pIndex);
        break;
      case STATUS_TYPE.Presential:
        this.updateDaySlotStatus(pSlot, STATUS_TYPE.Presential, pIndex);
        break;
    }
  }

  private updateDaySlotStatus(pSlot: UserSlot, pStatus: STATUS_TYPE, pIndex: number) {
    if (pSlot.HOLIDAY) {
      this.toastNotifService.showWarning('Ce jour est férié!');
      return;
    }
    const oldStatus = pSlot.STATUS_TYPE;
    pSlot.STATUS_TYPE = pStatus;
    pSlot.STATUS_TYPE_MORNING = STATUS_TYPE.None;
    pSlot.STATUS_TYPE_AFTER_NOON = STATUS_TYPE.None;

    this.userService.updateDaySlotStatus(pSlot).subscribe((res) => {
      if (!res.error) {
        this.daySlotUpdated.emit(pIndex);
        return;
      }
      this.toastNotifService.showError('Error in updating day slot status');
      pSlot.STATUS_TYPE = oldStatus;

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 10);
    });
  }

  updateSemiDayStatus(slot: UserSlot, index: number) {
    if (this.isIntern()) return;
    if (slot.HOLIDAY) {
      this.toastNotifService.showWarning('Ce jour est férié!');
      return;
    }
    const data: SemidayData = {
      slot,
      index
    };
    this.updateStatus.emit(data);
  }

  private isIntern(): boolean {
    return isObjectEmpty(this.currentUser) || this.currentUser.INTERN;
  }

  private warnNotUpdatable() {
    this.toastNotifService.showWarning(WARNING_MSG_UPDATE);
  }
}
