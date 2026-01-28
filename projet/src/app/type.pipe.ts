import { Pipe, PipeTransform } from '@angular/core';
import { Pollution } from './models/pollution.model';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class TypePipe implements PipeTransform {

  private normalize(str: string): string {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  transform(pollutions: Pollution[], type: string): Pollution[] {
    if (!type) return pollutions;
    const normalizedType = this.normalize(type);
    return pollutions.filter(p =>
      p.type_pollution && this.normalize(p.type_pollution) === normalizedType
    );
  }

}
