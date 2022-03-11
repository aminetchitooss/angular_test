import { AbstractControl, FormGroup } from '@angular/forms';

export interface profilePicture {
  photo: string | null;
  initials: string | null;
  name: string | null;
  isByUpn?: boolean;
}
export interface Route_Link {
  title: string;
  src: string;
  route: string;
}

export type weekInterval = [string, string, string, string, string];
export interface UserDataResult {
  currentDate: string; //retourne la date today
  searchDateDay: string; // StartDate Date| null ( quand c'est null => retourne la date today)
  searchDateWeek?: weekInterval; // [Lundi....vendredi] StartDate entre l'intervalle
  day?: DataSlot[];
  week?: DataSlot[];
  month?: DataSlot[];
  gauge?: DashDataSlot[];
  groupMonth?: GroupDataSlot[];
}

export interface GroupDataSlot {
  DATE: string; // yyyy-MM-dd
  NB_PRESENTIAL: number | null;
  NB_DISTANCE: number | null;
  NB_ABSENCE: number | null;
  NB_NONE: number | null;
}

export interface GroupUserInfo extends UserInfo {
  STATUS_TYPE: STATUS_TYPE | null; //  null = si pas renseigné du tout pour la journée.
  STATUS_TYPE_MORNING: STATUS_TYPE | null; //  null = si pas renseigné du tout pour lE MATIN
  STATUS_TYPE_AFTER_NOON: STATUS_TYPE | null; //  null = si pas renseigné du tout pour L'APRES-MIDI
}

export interface DashDataSlotGauge {
  DATE: string;
  GAUGE: number;
  HOLIDAY: boolean;
}
export interface DashDataSlot {
  groupeGauges: DashDataSlotGauge[];
  groupeInfo: { NAME: string };
}

export interface DataSlot {
  userInfo: UserInfo;
  userSlots: UserSlot[];
}
export interface UserInfo {
  FIRSTNAME: string;
  LASTNAME: string;
  PHOTO: string;
  UPN?: string;
}

export interface UserSlot {
  STATUS_TYPE: STATUS_TYPE | null; //  null = si pas renseigné du tout pour la journée.
  STATUS_TYPE_MORNING: STATUS_TYPE | null; //  null = si pas renseigné du tout pour lE MATIN
  STATUS_TYPE_AFTER_NOON: STATUS_TYPE | null; //  null = si pas renseigné du tout pour L'APRES-MIDI
  DATE: string; // yyyy-MM-dd
  HOLIDAY: boolean; // yyyy-MM-dd
}

export enum STATUS_TYPE {
  None = 1,
  Presential = 2,
  Distance = 3,
  Absent = 4
}

export enum STATUS_TYPE_LABEL {
  None = '',
  Presential = 'Site',
  Distance = 'Distance',
  Absent = 'Absent'
}

export enum STATUS_TYPE_LABEL_LONG {
  None = "Pas d'information",
  Presential = 'Sur site',
  Distance = 'À distance',
  Absent = 'Absent'
}

export interface StatusTypeResult {
  isMultiple: boolean | null;
  data: StatusTypeData;
  dataMorning: StatusTypeData;
  dataAfterNoon: StatusTypeData;
}

export type icons = '' | 'icon-primary' | 'icon-accent' | 'icon-success' | 'icon-warning' | 'icon-danger' | 'icon-gray' | 'icon-none' | 'icon-empty';
export type texts = '' | 'text-primary' | 'text-accent' | 'text-success' | 'text-warning' | 'text-danger' | 'text-gray';
export interface StatusTypeData {
  icon: string;
  label: string;
  label_long: string;
  class: icons;
  classText: texts;
}

export interface calendarDay {
  date: Date;
  dayLetter: string;
  day: number;
  month: string;
  identifier: string;
  isActive?: boolean;
}

export interface Group_Data_Modal {
  type: GROUP_TYPE;
  data: Group_Model;
}
export interface Group_Model {
  ID: number;
  TYP: GROUP_TYPE;
  NAME: string;
  NBMAX: number | null;
  MEMBER_LIST: MemberList[];
  NBSEAT: number | null;
  PERCENTMAX: number | null;
  newAdded?: boolean;
  OWNER?: boolean;
  ADMIN?: boolean;
}

export interface MemberList {
  ID?: number;
  FIRSTNAME?: string;
  LASTNAME?: string;
  VISA?: string;
  UPN: string;
  ADMIN?: boolean;
}

export enum GROUP_TYPE {
  Group = 1,
  Space = 2
}

export type Response_Type<T> = T & { error?: any; errorCode?: any };

export interface groupOrSpace {
  name: string;
  slots: number;
  peopleMax: number;
  occupationMax: number;
  user: NameSearch;
}

export type GroupOrSpaceControls = { [key in keyof groupOrSpace]: AbstractControl };
export type GroupOrSpaceFormGroup = FormGroup & { value: groupOrSpace; controls: GroupOrSpaceControls };
export interface SemidayData {
  slot: UserSlot;
  index: number;
}
export interface NameSearch {
  label: string;
  listlabel: string;
  value: string;
  isAdmin?: boolean;
}
export interface SelectedDate {
  isLocked: boolean;
  increment: boolean;
  activeDate: string;
}
export interface SelectedGroupDate {
  groupSpaceId: number;
  activeDate: string;
}
export interface UserSlotsData {
  [key: string]: UserSlot;
}
export interface Edit_Group_Model {
  data: Group_Model;
  isDeleted: boolean;
}
export interface RemoveFrom_Group_Model {
  groupId: number;
  isAdminDeleted: boolean;
  isGroup: boolean;
}

export interface ActivityBrowse {
  view: ACTIVITY_VIEW;
  user: NameSearch | null;
  groupSelected?: number;
  spaceSelected?: number;
  groupList: Group_Model[];
  viewGroup?: Group_Model;
}

export type ActivityBrowseControls = { [key in keyof ActivityBrowse]: AbstractControl };
export type ActivityBrowseFormGroup = FormGroup & { value: ActivityBrowse; controls: ActivityBrowseControls };

export enum ACTIVITY_VIEW {
  DAY,
  WEEK,
  MONTH
}
