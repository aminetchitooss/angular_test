import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupLabel'
})
export class GroupLabelPipe implements PipeTransform {
  transform(isGroup: boolean, pronoun = true, specific = false, clearAll = false): string {
    return isGroup ? `${clearAll ? '' : specific ? 'ce' : pronoun ? 'du' : 'le'} Groupe/Equipe` : `${clearAll ? '' : specific ? 'cet ' : pronoun ? "de l'" : "l'"}Espace/Zone`;
  }
}
