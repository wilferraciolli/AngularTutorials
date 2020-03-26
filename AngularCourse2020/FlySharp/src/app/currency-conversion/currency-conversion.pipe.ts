import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  RATE = 0.8;

  transform(value: any, rate: number = 1.0, args?: any): any {
    return 'USD ' + (value * rate).toFixed(2);
  }

}
