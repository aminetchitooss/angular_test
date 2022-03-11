import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { getDate, getDayInLetter, prefixSignleDigit } from 'src/app/shared/global-utils/functions';

@Pipe({
  name: 'dashweekFormat'
})
export class DashweekFormatPipe implements PipeTransform {
  @memo()
  transform(value: string | undefined): string {
    // console.log('calculate', Math.random());
    if (!value) return '...';
    const d = getDate(value);
    return [getDayInLetter(d), prefixSignleDigit(d.getDate())].join(' ');
  }
}
