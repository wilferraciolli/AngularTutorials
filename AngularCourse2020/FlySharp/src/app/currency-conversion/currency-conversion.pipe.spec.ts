import { CurrencyConversionPipe } from './currency-conversion.pipe';

describe('CurrencyConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
