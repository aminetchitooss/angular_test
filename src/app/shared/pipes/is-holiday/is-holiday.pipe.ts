import { Pipe, PipeTransform } from '@angular/core';
import { UserSlot } from '../../models/models';
import memo from 'memo-decorator';

@Pipe({
  name: 'isHoliday'
})
export class IsHolidayPipe implements PipeTransform {
  @memo()
  transform(date: string, list: UserSlot[] | undefined): boolean {
    if (!list) return false;
    return list.some((s) => s.DATE == date && s.HOLIDAY);
  }
}
