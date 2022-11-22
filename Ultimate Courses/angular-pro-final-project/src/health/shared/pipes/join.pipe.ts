import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  public transform(value: any): string {
    // used to convert an array list onto fomatted values
    return Array.isArray(value) ? value.join(', ') : value;
  }
}
