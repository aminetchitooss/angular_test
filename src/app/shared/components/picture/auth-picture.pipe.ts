import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { ApiService } from '../../api/api.service';

@Pipe({
  name: 'authPicture'
})
export class AuthPicturePipe implements PipeTransform {
  constructor(private http: ApiService) {}

  @memo()
  transform(src: string | null, isByUpn = false): Promise<any> {
    return new Promise((resolve) => {
      resolve(`https://randomuser.me/api/portraits/men/${Math.floor(100 * Math.random())}.jpg`);
    });
  }
}
