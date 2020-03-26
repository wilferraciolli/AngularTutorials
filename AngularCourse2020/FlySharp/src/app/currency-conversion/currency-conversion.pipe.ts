import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  RATE = 0.8;

  transform(value: number, rate: number = this.RATE): string {
    return 'USD ' + (value * rate).toFixed(2);
  }

}
