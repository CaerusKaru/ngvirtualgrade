import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<string>): Array<string> {
    if (!array) {
      return null;
    }
    array.sort((a: any, b: any) => {
      if ( a < b ) {
        return -1;
      } else if ( a > b ) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
