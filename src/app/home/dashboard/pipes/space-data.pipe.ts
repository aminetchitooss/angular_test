import { Pipe, PipeTransform } from '@angular/core';
import { DashDataSlotGauge } from 'src/app/shared/models/models';

@Pipe({
  name: 'spaceData'
})
export class SpaceDataPipe implements PipeTransform {
  transform(list: DashDataSlotGauge[], value: string): { result: number | undefined } {
    return { result: list.find((d) => d.DATE == value)?.GAUGE };
  }
}
