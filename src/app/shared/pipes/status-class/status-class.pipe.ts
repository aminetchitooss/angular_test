import { Pipe, PipeTransform } from '@angular/core';
import { StatusTypeData } from '../../models/models';
import memo from 'memo-decorator';

@Pipe({
  name: 'statusClass'
})
export class StatusClassPipe implements PipeTransform {
  @memo()
  transform(statusDataClass: string | undefined): string {
    if (!statusDataClass) return '';
    return statusDataClass;
  }
}
