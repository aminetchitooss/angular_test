import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { ACTIVITY_VIEW } from 'src/app/shared/models/models';
import { GroupService } from '../../api/group.service';
import { UserService } from '../../api/user.service';
import { getDailyCalendar, getDate, getDateDifferenceInDays, getLastDateInMonth, getPreviousDateInMonth } from '../../global-utils/functions';
import { calendarDay, Group_Model, GROUP_TYPE, UserDataResult } from '../../models/models';

@Component({
  selector: 'space-or-group-detail',
  templateUrl: './space-or-group-detail.component.html',
  styleUrls: ['./space-or-group-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceOrGroupDetailComponent implements OnInit {
  groupData: Group_Model = {} as Group_Model;
  GROUP_TYPE = GROUP_TYPE;
  isSpace: boolean = false;
  calendarDays: calendarDay[] = [];
  calendarDaysPending = Array(8);
  currentDayIdentifier: string = '';
  cuurentActiveDate: Date | null = null;
  dataResult: UserDataResult = {} as UserDataResult;
  WeekPending = Array(8);

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private _userservice: UserService, private _groupService: GroupService) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => !id && !isNaN(Number(id))),
        tap(() => (this.WeekPending = Array(8))),
        switchMap((id) => this._groupService.getGroupOrSpaceById(Number(id)))
        // delay(5000)
      )
      .subscribe((arg) => {
        this.groupData = arg;
        this.isSpace = arg.TYP == GROUP_TYPE.Space;
        this.WeekPending = [];
        this.loadData();
      });
  }

  ngOnInit(): void {}

  setResultUserData(res: UserDataResult) {
    // console.log(res.day);
    this.dataResult = res;

    const today = getDate(res.currentDate);
    const vMinDate: Date = getPreviousDateInMonth(today.getFullYear(), today.getMonth() % 12, today.getDate());
    const vMaxDate: Date = getLastDateInMonth(today.getFullYear(), (today.getMonth() % 12) + 1);
    this.calendarDaysPending = [];

    if (!this.currentDayIdentifier) this.calendarDays = getDailyCalendar(res.currentDate, getDateDifferenceInDays(today, vMinDate), getDateDifferenceInDays(today, vMaxDate));

    setTimeout(() => {
      this.scrollToDay(this.currentDayIdentifier || 'calendar-after-0');
    }, 400);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  private loadData(pMinDate: Date | null = null) {
    if (!pMinDate) this.currentDayIdentifier = '';

    this._userservice.getUserDataByGroupOrSpaceId(this.groupData.ID, ACTIVITY_VIEW.DAY, pMinDate).subscribe((res) => {
      if (res?.error) return;
      this.setResultUserData(res);
    });
  }

  chooseDay(day: calendarDay) {
    if (day.identifier.indexOf('calendar-forShow') > -1) return;
    this.calendarDays.forEach((elm) => (elm.isActive = false));
    day.isActive = true;
    this.scrollToDay(day.identifier);
    this.currentDayIdentifier = day.identifier;
    this.cuurentActiveDate = day.date;
    this.loadData(day.date);
  }

  private scrollToDay(pIdentifier: string, isFast = false) {
    if (isFast) document.getElementById(pIdentifier)?.scrollIntoView();
    else document.getElementById(pIdentifier)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
}
