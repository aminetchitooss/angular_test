import { Pipe, PipeTransform } from '@angular/core';
import { getDate, getDayInLetter, prefixSignleDigit } from 'src/app/shared/global-utils/functions';

@Pipe({
  name: 'dayNumber'
})
export class DayNumberPipe implements PipeTransform {
  transform(value: string, onlyNumber = true, onlyDay = false): string | number {
    const d = getDate(value);
    if (onlyNumber) return prefixSignleDigit(d.getDate());
    if (onlyDay) return getDayInLetter(d).substring(0, 3);
    return [getDayInLetter(d).substring(0, 3), prefixSignleDigit(d.getDate())].join(' ');
  }
}
