import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { setInitials } from '../../global-utils/functions';
import { profilePicture } from '../../models/models';
import { User_Model } from '../../store/user/user.model';

@Pipe({
  name: 'photoByUpn'
})
export class PhotoByUpnPipe implements PipeTransform {
  @memo()
  transform(value: string): profilePicture {
    return {
      initials: setInitials({ FIRSTNAME: value.split('.')[0], LASTNAME: value.split('.')[1] } as User_Model),
      photo: value,
      isByUpn: true
    } as profilePicture;
  }
}
