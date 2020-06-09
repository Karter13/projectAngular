import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dotTwo'
})
export class DotTwoPipe implements PipeTransform {
  transform(value: any, max: number = 50): any {
    if (value.length <= max) {
      return value;
    }

    return `${value.slice(0, max - 3)}...`;
  }

}
