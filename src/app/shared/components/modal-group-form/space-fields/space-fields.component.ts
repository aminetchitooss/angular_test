import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupOrSpaceFormGroup } from 'src/app/shared/models/models';

@Component({
  selector: 'space-fields',
  templateUrl: './space-fields.component.html',
  styleUrls: ['./space-fields.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceFieldsComponent implements OnInit, OnDestroy {
  @Input() isFormDisabled: boolean = true;
  @Input() groupForm: GroupOrSpaceFormGroup | undefined;
  subs: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.detectJaugesChanges();
    this.checkIfSlotIsFull();
  }

  private detectJaugesChanges(): void {
    const slotsSub = this.groupForm?.controls?.slots?.valueChanges.subscribe(() => this.recalculate(true));
    if (slotsSub) this.subs.push(slotsSub);

    const peopleMaxSub = this.groupForm?.controls?.peopleMax?.valueChanges.subscribe(() => this.recalculate(false, true));
    if (peopleMaxSub) this.subs.push(peopleMaxSub);

    const occupationMaxSub = this.groupForm?.controls?.occupationMax?.valueChanges.subscribe(() => this.recalculate(false, false, true));
    if (occupationMaxSub) this.subs.push(occupationMaxSub);
  }

  private recalculate(hasSlotChanged = false, hasPeopleChanged = false, hasOccupChanged = false) {
    const slotsValue = this.groupForm?.controls?.slots.value;
    const peopleMaxValue = this.groupForm?.controls?.peopleMax.value;
    const occupationMaxValue = this.groupForm?.controls?.occupationMax.value;
    this.checkIfSlotIsFull();
    if (slotsValue != null && slotsValue != '' && slotsValue >= 0) {
      if (hasSlotChanged) {
        if (this.groupForm?.controls?.peopleMax.touched || this.groupForm?.controls?.occupationMax.touched) {
          if (peopleMaxValue != null && peopleMaxValue >= 0) {
            this.groupForm?.controls?.peopleMax.setValue(Math.floor(peopleMaxValue), { emitEvent: false });
            this.setOccup(peopleMaxValue, slotsValue);
          } else if (occupationMaxValue != null && occupationMaxValue >= 0) {
            this.setPeople(occupationMaxValue, slotsValue);
            this.groupForm?.controls?.occupationMax.setValue(Math.floor(peopleMaxValue), { emitEvent: false });
          }
        } else {
          this.groupForm?.controls?.peopleMax.setValue(Math.floor(slotsValue), { emitEvent: false });
          this.groupForm?.controls?.occupationMax.setValue(100, { emitEvent: false });
        }
      } else if (hasPeopleChanged) {
        this.setOccup(peopleMaxValue, slotsValue);
      } else if (hasOccupChanged) {
        this.setPeople(occupationMaxValue, slotsValue);
      }
    }
  }

  private setOccup(peopleMaxValue: number, slotsValue: number) {
    this.groupForm?.controls?.occupationMax.setValue(Math.floor((100 * peopleMaxValue) / slotsValue), { emitEvent: false });
  }

  private setPeople(occupationMaxValue: number, slotsValue: number) {
    this.groupForm?.controls?.peopleMax.setValue(Math.floor((slotsValue * occupationMaxValue) / 100), { emitEvent: false });
  }

  private checkIfSlotIsFull() {
    if (!this.groupForm?.controls?.slots.value || this.groupForm?.controls?.slots.value < 0 || this.isFormDisabled) {
      this.groupForm?.controls?.peopleMax.disable({ emitEvent: false });
      this.groupForm?.controls?.occupationMax.disable({ emitEvent: false });
    } else {
      this.groupForm?.controls?.peopleMax.enable({ emitEvent: false });
      this.groupForm?.controls?.occupationMax.enable({ emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub?.unsubscribe());
  }
}
