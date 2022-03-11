import { Pipe, PipeTransform } from '@angular/core';
import { MemberList } from '../../models/models';
import { User_Model } from '../../store/user/user.model';

@Pipe({
  name: 'sortByAdmin'
})
export class SortByAdminPipe implements PipeTransform {
  transform(value: MemberList[] | undefined, pCurrentUser: User_Model): MemberList[] | undefined {
    if (!value) return value;
    const listSortedByAdmin = value.sort((a: MemberList, b: MemberList) => (!!a.ADMIN < !!b.ADMIN ? 1 : -1));
    const curentUserAdminIndex = listSortedByAdmin.findIndex((u) => u.UPN == pCurrentUser.UPN && u.ADMIN);
    if (curentUserAdminIndex > 0) {
      const temp = listSortedByAdmin[0];
      listSortedByAdmin[0] = listSortedByAdmin[curentUserAdminIndex];
      listSortedByAdmin[curentUserAdminIndex] = temp;
    }
    return listSortedByAdmin;
  }
}
