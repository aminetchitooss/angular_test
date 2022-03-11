import {
  calendarDay,
  DataSlot,
  MemberList,
  NameSearch,
  Response_Type,
  StatusTypeData,
  StatusTypeResult,
  STATUS_TYPE,
  STATUS_TYPE_LABEL,
  STATUS_TYPE_LABEL_LONG,
  UserDataResult,
  UserInfo,
  UserSlot,
  weekInterval
} from '../models/models';
import { User_Model } from '../store/user/user.model';
import { MONTHS, WEEK_DAYS } from './constants';

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function setInitials(user: User_Model | UserInfo) {
  return [user.FIRSTNAME?.charAt(0)?.toUpperCase(), user.LASTNAME?.charAt(0)?.toUpperCase()].join(' ');
}

export function getFullName(user: User_Model | UserInfo | MemberList) {
  return [user.FIRSTNAME, user.LASTNAME].join(' ');
}

export function prefixSignleDigit(pNumber: number) {
  const length = pNumber.toString().length;
  return length == 1 ? '0' + pNumber : pNumber;
}

export function isDashboard(): boolean {
  return window.location.href.indexOf('dashboard') > -1;
}

export function isEmptyObject(obj: Object): boolean {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

export function getDayInLetter(date: Date): string {
  return WEEK_DAYS[date.getDay()];
}

export function getMonthInLetter(date: Date): string {
  return MONTHS[date.getMonth()];
}

export function isWeekend(date: Date): boolean {
  return date.getDay() == 0 || date.getDay() == 6;
}

export function apiDateFormat(date: Date): string {
  return [date.getFullYear(), prefixSignleDigit(date.getMonth() + 1), prefixSignleDigit(date.getDate())].join('-');
}

export function getDate(date: string | Date): Date {
  if (typeof date == 'object') return new Date(date);
  return new Date(date.split(' ').join('T'));
}
export const lastday = function (y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
};

export function getLastDateInMonth(y: number, m: number): Date {
  const last = lastday(y, m);
  const d = new Date();
  d.setFullYear(y);
  d.setMonth(m);
  d.setDate(last);
  return d;
}

export function getPreviousDateInMonth(y: number, m: number, day: number): Date {
  const d = new Date();
  d.setDate(day);
  d.setFullYear(y);
  d.setMonth(m - 1);
  return d;
}

export function getDateDifferenceInDays(date1: any, date2: any): number {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function isArrayEquals(a: NameSearch[], b: NameSearch[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    (a.length == 0 || a.every((name) => b.some((res) => res['isAdmin'] == name['isAdmin'] && res['value'] == name['value'])))
  );
}

// export function sortSearchResultByName(res: Response_Type<UserDataResult>): UserDataResult {
//   res.day?.sort((a: DataSlot, b: DataSlot) => a.userInfo.FIRSTNAME.localeCompare(b.userInfo.FIRSTNAME));
//   res.week?.sort((a: DataSlot, b: DataSlot) => a.userInfo.FIRSTNAME.localeCompare(b.userInfo.FIRSTNAME));
//   return res;
// }
export function isExtern(user: User_Model): boolean {
  return !user.INTERN;
}

export function getStatusResult(userSlot: UserSlot | undefined, includeNoneText: boolean): Partial<StatusTypeResult> {
  if (!userSlot)
    return {
      isMultiple: false
    };
  if (userSlot.STATUS_TYPE_MORNING == userSlot.STATUS_TYPE_AFTER_NOON)
    return {
      isMultiple: false,
      data: getStatus(userSlot.STATUS_TYPE, includeNoneText)
    };
  return {
    isMultiple: true,
    dataMorning: getStatus(userSlot.STATUS_TYPE_MORNING, includeNoneText),
    dataAfterNoon: getStatus(userSlot.STATUS_TYPE_AFTER_NOON, includeNoneText)
  };
}

function getStatus(value: STATUS_TYPE | undefined | null, includeNoneText: boolean): StatusTypeData {
  switch (value) {
    case STATUS_TYPE.Absent:
      return {
        icon: 'notSet',
        label: STATUS_TYPE_LABEL.Absent,
        label_long: STATUS_TYPE_LABEL_LONG.Absent,
        class: 'icon-gray',
        classText: 'text-gray'
      };

    case STATUS_TYPE.Presential:
      return {
        icon: 'declare',
        label: STATUS_TYPE_LABEL.Presential,
        label_long: STATUS_TYPE_LABEL_LONG.Presential,
        class: 'icon-primary',
        classText: 'text-primary'
      };

    case STATUS_TYPE.Distance:
      return {
        icon: 'home',
        label: STATUS_TYPE_LABEL.Distance,
        label_long: STATUS_TYPE_LABEL_LONG.Distance,
        class: 'icon-danger',
        classText: 'text-danger'
      };

    default:
      return {
        icon: 'no-info',
        label: includeNoneText ? STATUS_TYPE_LABEL_LONG.None : STATUS_TYPE_LABEL.None,
        label_long: STATUS_TYPE_LABEL_LONG.None,
        class: 'icon-empty',
        classText: ''
      };
  }
}

export function getDailyCalendar(value: string, diffrenceBefore: number, diffrenceAfter: number): calendarDay[] {
  if (!value) return [];
  let vResult: calendarDay[] = [];
  const dateSelected = getDateActiveNonWeekend(value);
  const vMaxCalendar = diffrenceBefore + diffrenceAfter;
  for (let index = 0; index < vMaxCalendar; index++) {
    const date = getDate(dateSelected);
    const identifier = index - diffrenceBefore;
    date.setDate(date.getDate() + identifier);
    if (isWeekend(date)) continue;
    // console.log(`minus ${index - pMaxCalendar / 2}  => ${date}`);
    vResult.push({
      date,
      day: date.getDate(),
      dayLetter: getDayInLetter(date)?.substring(0, 3),
      month: getMonthInLetter(date)?.substring(0, 3),
      identifier: `calendar-${(identifier < 0 ? 'before-' : 'after-') + identifier}`,
      isActive: identifier == 0
    });
  }
  // for (let index = 0; index < 4; index++) {
  //   vResult.unshift({
  //     date: new Date(),
  //     day: 0,
  //     dayLetter: '',
  //     month: '',
  //     identifier: `calendar-forShow${index}`,
  //     isActive: false
  //   });
  //   vResult.push({
  //     date: new Date(),
  //     day: 0,
  //     dayLetter: '',
  //     month: '',
  //     identifier: `calendar-forShow${index}`,
  //     isActive: false
  //   });
  // }
  return vResult;
}

export function getWeekTitle(value: weekInterval | undefined): string {
  if (!value) return '';
  const startDate = getDate(value[0]);

  const endDate = getDate(value[4]);
  return [
    'Du',
    startDate.getDate(),
    getMonthInLetter(startDate),
    startDate.getFullYear() !== endDate.getFullYear() ? startDate.getFullYear() : '',
    'au',
    endDate.getDate(),
    getMonthInLetter(endDate),
    endDate.getFullYear()
  ].join(' ');
}

export function getDashWeekTitle(value: weekInterval | undefined): string {
  if (!value) return '';
  const startDate = getDate(value[0]);

  const endDate = getDate(value[4]);
  return [
    'du',
    startDate.getDate(),
    startDate.getMonth() === endDate.getMonth()
      ? ['au', endDate.getDate(), getMonthInLetter(startDate), startDate.getFullYear() !== endDate.getFullYear() ? startDate.getFullYear() : ''].join(' ')
      : [getMonthInLetter(startDate), 'au', endDate.getDate(), getMonthInLetter(endDate)].join(' '),
    endDate.getFullYear()
  ].join(' ');
}

const sessionIdUser = 'userSearched';
export function getUserSearchInDashboard(): NameSearch | undefined {
  return sessionStorage[sessionIdUser] ? JSON.parse(sessionStorage[sessionIdUser]) : undefined;
}

export function setUserSearchFromDashboard(pUser: NameSearch): void {
  sessionStorage[sessionIdUser] = JSON.stringify(pUser);
}

export function clearUserSearchFromDashboard(): void {
  sessionStorage.removeItem(sessionIdUser);
}
export function isObjectEmpty(obj: Object): boolean {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}
export function isUnderToday(date: Date, today: Date): boolean {
  const todayYear = today.getFullYear();
  const dateYear = date.getFullYear();

  if (dateYear == todayYear) return date.getMonth() < today.getMonth();
  return dateYear < todayYear;
}
export function sortData(data: Response_Type<UserDataResult>, currentUpn: string | undefined): Response_Type<UserDataResult> {
  if (!currentUpn) return data;
  data.day = sortuserData(data.day, currentUpn);
  data.week = !data.week ? data.week : [...data.week.filter((r) => r.userInfo.UPN == currentUpn), ...sortAlpha(data.week.filter((r) => r.userInfo.UPN !== currentUpn))];
  return data;
}

function sortuserData(res: DataSlot[] | undefined, currentUpn: string): DataSlot[] | undefined {
  if (!res) return res;

  const currentUser = res.filter((r) => r.userInfo.UPN == currentUpn);
  const nonCurrentUser = res.filter((r) => r.userInfo.UPN !== currentUpn);
  const FullDay = nonCurrentUser.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE_MORNING == s.STATUS_TYPE_AFTER_NOON));
  const semiDay = nonCurrentUser.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE_MORNING !== s.STATUS_TYPE_AFTER_NOON));

  return [
    ...currentUser,
    ...sortAlpha(FullDay.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE == STATUS_TYPE.Presential))),
    ...sortAlpha(FullDay.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE == STATUS_TYPE.Distance))),
    ...sortAlpha(FullDay.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE == STATUS_TYPE.Absent))),
    ...sortAlpha(FullDay.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE == STATUS_TYPE.None))),
    ...sortAlpha(semiDay),
    ...sortAlpha(FullDay.filter((r) => r.userSlots.some((s) => s.STATUS_TYPE == null)))
  ];
}

function sortAlpha(data: DataSlot[]): DataSlot[] {
  return data.sort((a: DataSlot, b: DataSlot) => a.userInfo.FIRSTNAME.localeCompare(b.userInfo.FIRSTNAME));
}
export function getDateActiveNonWeekend(date: string): string {
  const searchDateTemp = getDate(date);
  if (searchDateTemp.getDay() == 0) searchDateTemp.setDate(searchDateTemp.getDate() + 1);
  else if (searchDateTemp.getDay() == 6) searchDateTemp.setDate(searchDateTemp.getDate() + 2);
  const dateString = [searchDateTemp.getFullYear(), prefixSignleDigit(searchDateTemp.getMonth() + 1), prefixSignleDigit(searchDateTemp.getDate())].join('-') + ' 00:00:00';
  return dateString;
}

export function clearRedirectAfterLogin(): void {
  localStorage.removeItem('URL_HISTORY');
}
export function rememberLoggedIn(): void {
  localStorage['save'] = 'true';
}
export function isLoggedIn(): boolean {
  return localStorage['save'] == 'true';
}

export function sortByAdmin(value: NameSearch[]) {
  return value.sort((a: NameSearch, b: NameSearch) => (!!a.isAdmin < !!b.isAdmin ? 1 : -1));
}
