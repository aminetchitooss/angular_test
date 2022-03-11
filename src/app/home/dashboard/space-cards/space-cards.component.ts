import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SemidayData, UserDataResult } from 'src/app/shared/models/models';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'space-cards',
  templateUrl: './space-cards.component.html'
})
export class SpaceCardsComponent implements OnInit {
  @Input() currentUser: User_Model = {} as User_Model;
  @Input() dataResult: UserDataResult = {} as UserDataResult;
  @Input() isUnderSearchScopePrevious: boolean = true;
  @Output() updateStatus: EventEmitter<SemidayData> = new EventEmitter();
  @Output() isDayUpdated: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  updateSemiDayStatus(data: SemidayData) {
    this.updateStatus.emit(data);
  }

  daySlotUpdated(pIndex: number) {
    this.isDayUpdated.emit(pIndex);
  }
}
