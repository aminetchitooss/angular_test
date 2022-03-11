import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/api/user.service';
import { WARNING_MSG_UPDATE } from 'src/app/shared/global-utils/constants';
import { getDate, getLastDateInMonth, getPreviousDateInMonth, getDashWeekTitle, setUserSearchFromDashboard, isUnderToday } from 'src/app/shared/global-utils/functions';
import { ACTIVITY_VIEW, NameSearch, SemidayData, UserDataResult, UserSlot } from 'src/app/shared/models/models';
import { DataService } from 'src/app/shared/services/data.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToastNotifService } from 'src/app/shared/services/toast-notif.service';
import { User_Model } from 'src/app/shared/store/user/user.model';
import { ActivityBrowse, ActivityBrowseControls, ActivityBrowseFormGroup } from 'src/app/shared/models/models';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoaded = true;
  searching = false;
  activityBrowseForm: ActivityBrowseFormGroup;
  weekTitle = 'Semaine ...';
  dataResult: UserDataResult = {} as UserDataResult;
  cuurentActiveDate: Date | null = null;
  today: Date | null = null;
  isUnderSearchScopePrevious: boolean = true;
  isUnderSearchScopeNext: boolean = true;
  isUnderSearchScopeNextMonth: boolean = true;
  searchUserChanges$: Observable<any>;
  currentUser$: Observable<User_Model>;
  list = Array(5);
  constructor(
    public _dataService: DataService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _modalService: ModalService,
    private _toastNotifService: ToastNotifService,
    private _router: Router,
    private _store: Store<{ user: User_Model }>
  ) {
    this.currentUser$ = _store.select('user');

    this.activityBrowseForm = this.fb.group({
      view: new FormControl(-1),
      user: new FormControl(''),
      groupList: new FormControl([])
    } as ActivityBrowseControls) as ActivityBrowseFormGroup;
    this.searchUserChanges$ = this.activityBrowseForm.valueChanges.pipe(
      filter((search: ActivityBrowse) => !!search.user),
      tap((search: ActivityBrowse) => this.searchUser(search.user))
    );
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private searchUser(pUser: NameSearch | null) {
    if (!pUser) return;
    setUserSearchFromDashboard(pUser);
    this._router.navigate(['home/browse']);
  }

  private loadUserData(pMinDate: Date | null = null) {
    this.searching = true;
    this._userService.getUserDashData(ACTIVITY_VIEW.WEEK, pMinDate).subscribe((res) => {
      if (res?.error) return;
      this.setResultUserData(res);
    });
  }

  private setResultUserData(res: UserDataResult) {
    // console.log(res);

    this.dataResult = res;
    const searchDate = getDate(res.searchDateDay);

    this.cuurentActiveDate = searchDate;
    this.today = getDate(res.currentDate);
    const vMinDate: Date = getPreviousDateInMonth(this.today.getFullYear(), this.today.getMonth() % 12, this.today.getDate());
    this.isUnderSearchScopePrevious = vMinDate.getTime() < this.cuurentActiveDate.getTime();

    const vMaxDate = getDate(res.currentDate);
    vMaxDate.setMonth(vMaxDate.getMonth() + 12);
    this.isUnderSearchScopeNext = this.cuurentActiveDate.getTime() + 24 * 3600 * 1000 < vMaxDate.getTime();

    let lastDayInMonthSearch: Date = getLastDateInMonth(searchDate.getFullYear(), searchDate.getMonth());

    if (lastDayInMonthSearch) {
      this.isUnderSearchScopeNextMonth = lastDayInMonthSearch.getTime() < vMaxDate.getTime();
    }
    this.weekTitle = 'Semaine ' + getDashWeekTitle(res.searchDateWeek);
    setTimeout(() => {
      this.isLoaded = false;
      this.searching = false;
    }, 100);
  }

  previousWeek() {
    if (!this.isUnderSearchScopePrevious) return;

    if (!this.dataResult?.searchDateWeek) return;
    const d = getDate(this.dataResult.searchDateWeek[0]);
    d.setDate(d.getDate() - 7);
    this.loadUserData(d);
  }

  nextWeek() {
    if (!this.isUnderSearchScopeNextMonth) return;

    if (!this.dataResult?.searchDateWeek) return;

    const d = getDate(this.dataResult.searchDateWeek[4]);
    d.setDate(d.getDate() + 3);
    this.loadUserData(d);
  }

  daySlotUpdated(pIndex: number) {
    this._userService.getUserDashData(ACTIVITY_VIEW.WEEK, this.cuurentActiveDate).subscribe((res) => {
      if (res?.error) return;
      if (this.dataResult.gauge)
        for (let index = 0; index < this.dataResult.gauge.length; index++) {
          if (res.gauge?.[index]) {
            this.dataResult.gauge[index].groupeGauges = res.gauge[index].groupeGauges;
          }
        }
    });
  }

  toggleSemiDayStatus(data: SemidayData) {
    const { slot, index } = data;
    const d = getDate(slot.DATE);
    if (!this.isUnderSearchScopePrevious || (this.today && isUnderToday(d, this.today))) return this.warnNotUpdatable();
    this._modalService
      .addOrUpdateSemiDayStatus(slot)
      .afterClosed()
      .subscribe((updatedSlot) => {
        if (!updatedSlot) return;
        if (!this.dataResult.week) return;
        this.dataResult.week[0].userSlots[index] = updatedSlot;
        this.daySlotUpdated(index);
      });
  }

  warnNotUpdatable() {
    this._toastNotifService.showWarning(WARNING_MSG_UPDATE);
  }
}
