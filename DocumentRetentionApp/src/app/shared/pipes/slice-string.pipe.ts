import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {

  // Modificacmos la cadena para que no muestre los "_" del nombre del documento
  transform(value: string, arg: any): string {
    let aux:  string[];
    let result: string = '';

    if ( !value.includes('_') ) {
      return value;
    }

    aux = value.split('_');
    for ( const word of aux ) {
      result += word + ' ';
    }
    
    result = result.trim();
    
    return result;
  }

}
