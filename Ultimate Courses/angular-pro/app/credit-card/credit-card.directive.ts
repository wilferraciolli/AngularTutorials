import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[credit-card]'
})
export class CreditCardDirective {

  // bind to a host so styles can be added to the host
  @HostBinding('style.border')
  border: string;

  // create a function to listen to keyboad event on the host(when the directive is applied )
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');// remove white spaces
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);//keep it 16 chars
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    // we want to create batches of fours digits ['1234', '1234', '1234', '1234']
    input.value = numbers.join(' ');

    // use the host binding to check if there are only numbers and apply red border when fails regex
    this.border = '';
    if (/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }

  constructor(private element: ElementRef) {
    console.log(this.element);
  }
}
