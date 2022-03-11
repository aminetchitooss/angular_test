import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_TYPE } from '../../models/models';

@Pipe({
  name: 'semiDayMenuTitle'
})
export class SemiDayMenuTitlePipe implements PipeTransform {
  transform(STATUS_TYPE_MORNING: STATUS_TYPE | null, STATUS_TYPE_AFTER_NOON: STATUS_TYPE | null): string {
    const isMultiple = STATUS_TYPE_AFTER_NOON != STATUS_TYPE_MORNING;
    return isMultiple ? 'Modifier ma demi-journée' : 'Déclarer une présence par demi-journée';
  }
}
