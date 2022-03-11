import { Pipe, PipeTransform } from '@angular/core';
import { icons, STATUS_TYPE, STATUS_TYPE_LABEL_LONG, texts } from 'src/app/shared/models/models';
import memo from 'memo-decorator';

@Pipe({
  name: 'fullDayStatus'
})
export class FullDayStatusPipe implements PipeTransform {
  @memo()
  transform(value: STATUS_TYPE | null): {
    filled: string;
    text: string;
    colorIconRemote: icons;
    colorTextRemote: texts;
    colorIconAbsent: icons;
    colorTextAbsent: texts;
    colorIconOffice: icons;
    colorTextOffice: texts;
  } {
    switch (value) {
      case STATUS_TYPE.Absent:
        return {
          filled: 'highlighted',
          text: 'Journée entière',
          colorIconAbsent: 'icon-gray',
          colorTextAbsent: 'text-gray',
          colorIconRemote: '',
          colorTextRemote: '',
          colorIconOffice: '',
          colorTextOffice: ''
        };

      case STATUS_TYPE.Distance:
        return {
          filled: 'highlighted',
          text: 'Journée entière',
          colorIconAbsent: '',
          colorTextAbsent: '',
          colorIconRemote: 'icon-danger',
          colorTextRemote: 'text-danger',
          colorIconOffice: '',
          colorTextOffice: ''
        };
      case STATUS_TYPE.Presential:
        return {
          filled: 'highlighted',
          text: 'Journée entière',
          colorIconAbsent: '',
          colorTextAbsent: '',
          colorIconRemote: '',
          colorTextRemote: '',
          colorIconOffice: 'icon-primary',
          colorTextOffice: 'text-primary'
        };

      default:
        return {
          filled: '',
          text: STATUS_TYPE_LABEL_LONG.None,
          colorIconRemote: '',
          colorTextRemote: '',
          colorIconAbsent: '',
          colorTextAbsent: '',
          colorIconOffice: '',
          colorTextOffice: ''
        };
    }
  }
}
