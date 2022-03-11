import { Pipe, PipeTransform } from '@angular/core';
import { getDate, isWeekend } from 'src/app/shared/global-utils/functions';
import { DataSlot } from 'src/app/shared/models/models';

@Pipe({
  name: 'removeWeekends'
})
export class RemoveWeekendsPipe implements PipeTransform {
  transform(value: DataSlot[] | undefined): DataSlot[] | undefined {
    if (!value) return value;
    const tt = value.map((res) => ({ ...res, userSlots: res.userSlots.filter((slot) => !isWeekend(getDate(slot.DATE))) }));
    return tt;
  }
}
