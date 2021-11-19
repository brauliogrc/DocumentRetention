import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStatus'
})
export class ShowStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if ( value ) {
      return 'Activo';
    }
    return 'Incativo';  
  }

}
