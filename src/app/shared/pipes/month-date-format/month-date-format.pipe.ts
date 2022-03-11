import { Pipe, PipeTransform } from '@angular/core';
import { getMonthInLetter } from 'src/app/shared/global-utils/functions';
import memo from 'memo-decorator';

@Pipe({
  name: 'monthDateFormat'
})
export class MonthDateFormatPipe implements PipeTransform {
  @memo()
  transform(value: Date | null): string {
    if (!value) return '';
    return [getMonthInLetter(value), value.getFullYear()].join(' ');
  }
}
