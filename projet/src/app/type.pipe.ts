import { Pipe, PipeTransform } from '@angular/core';
import { Pollution } from './models/pollution.model';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class TypePipe implements PipeTransform {

  transform(pollutions: Pollution[], type: string): Pollution[] {
    if (!type) return pollutions;
    return pollutions.filter(p => p.type_pollution === type);
  }

}
