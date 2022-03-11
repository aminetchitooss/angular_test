import { Pipe, PipeTransform } from '@angular/core';
import { setInitials } from 'src/app/shared/global-utils/functions';
import { profilePicture, UserInfo } from 'src/app/shared/models/models';
import memo from 'memo-decorator';

@Pipe({
  name: 'activityInfo'
})
export class ActivityInfoPipe implements PipeTransform {
  @memo()
  transform(value: UserInfo): profilePicture {
    return {
      initials: setInitials(value),
      photo: value.PHOTO
    } as profilePicture;
  }
}
