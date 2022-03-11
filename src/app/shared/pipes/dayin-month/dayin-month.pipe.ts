import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { getDate, lastday } from '../../global-utils/functions';

@Pipe({
  name: 'dayinMonth'
})
export class DayinMonthPipe implements PipeTransform {
  @memo()
  transform(value: string): { first: boolean; last: boolean } {
    const d = getDate(value);
    const last = lastday(d.getFullYear(), d.getMonth());
    return {
      first: (d.getDay() == 1 && (d.getDate() == 2 || d.getDate() == 3)) || d.getDate() == 1,
      last: last == d.getDate()
    };
  }
}
