import { Pipe, PipeTransform } from '@angular/core';
import { sortByAdmin } from '../../global-utils/functions';
import { NameSearch } from '../../models/models';

@Pipe({
  name: 'sortUsers'
})
export class SortUsersPipe implements PipeTransform {
  transform(value: NameSearch[]): NameSearch[] {
    return sortByAdmin(value);
  }
}
