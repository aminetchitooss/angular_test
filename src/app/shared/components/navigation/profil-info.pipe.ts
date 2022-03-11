import { Pipe, PipeTransform } from '@angular/core';
import { getFullName, setInitials } from '../../global-utils/functions';
import { profilePicture } from '../../models/models';
import { User_Model } from '../../store/user/user.model';

@Pipe({
  name: 'profilInfo'
})
export class ProfilInfoPipe implements PipeTransform {
  transform(value: User_Model): profilePicture {
    return {
      initials: setInitials(value),
      photo: value.PHOTO,
      name: getFullName(value)
    };
  }
}
