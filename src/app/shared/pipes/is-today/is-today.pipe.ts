import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {
  @memo()
  transform(value: string, today: string | undefined): string {
    if (!today) return '';
    return value == today ? 'current' : '';
  }
}
