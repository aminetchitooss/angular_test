import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  @memo()
  transform(value: number | undefined): number | undefined {
    if (!value) return value;
    return Math.round(value);
  }
}
