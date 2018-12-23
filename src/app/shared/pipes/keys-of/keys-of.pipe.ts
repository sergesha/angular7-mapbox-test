import { Pipe, PipeTransform } from '@angular/core';

/**
 * 'keysOf' pipe returns keys of object
 */
@Pipe({
  name: 'keysOf'
})
export class KeysOfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return typeof value === 'object' ? Object.keys(value) : null;
  }

}
