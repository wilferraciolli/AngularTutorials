import { AbstractControl } from '@angular/forms';

export class StockValidators {

  // custom validator that will take whichever form control that is assigned to within the array of validators
  static checkBranch(control: AbstractControl) {
    // pattern to check if matches 1 letter and 3 numbers
    const regexp = /^[a-z]\d{3}$/i;
    const valid = regexp.test(control.value);

    return valid ? null : { invalidBranch: true };
  }
}
