import { Pipe, PipeTransform } from '@angular/core';
import { getDate } from 'src/app/shared/global-utils/functions';

@Pipe({
  name: 'isMonthDifferentCalendar'
})
export class IsMonthDifferentCalendarPipe implements PipeTransform {
  transform(value: string, curentActiveDate: Date | null, today: string = '', lyoum: string = ''): 'none' | 'hide' | 'isToday' | 'lyoum' {
    if (!curentActiveDate) return 'none';
    const d = getDate(value);
    if (d.getMonth() !== curentActiveDate.getMonth()) return 'hide';
    if (value == today) return 'isToday';
    if (value == lyoum) return 'lyoum';
    return 'none';
  }
}
