import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dot'
})
export class DotPipe implements PipeTransform {
  transform(value: any, max: number = 100): any {
    if (value.length <= max) {
      return value;
    }

    return `${value.slice(0, max - 3)}...`;
  }

}
