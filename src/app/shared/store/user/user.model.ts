export interface User_Model {
  FIRSTNAME: string;
  ID: number;
  LASTNAME: string;
  PHOTO: string;
  UPN: string;
  ISMANAGER: boolean;
  INTERN: boolean;
  SITE_NAME: string;
  LASTVERSIONREAD: string;
  IDLASTGROUPE: number | null;
  error?: any;
}
