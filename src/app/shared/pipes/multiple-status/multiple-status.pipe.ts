import { Pipe, PipeTransform } from '@angular/core';
import { StatusTypeResult, UserSlot } from 'src/app/shared/models/models';
import memo from 'memo-decorator';
import { getStatusResult } from '../../global-utils/functions';

@Pipe({
  name: 'multipleStatus'
})
export class MultipleStatusPipe implements PipeTransform {
  @memo()
  transform(userSlot: UserSlot | undefined, includeNoneText = false): Partial<StatusTypeResult> {
    return getStatusResult(userSlot, includeNoneText);
  }
}
