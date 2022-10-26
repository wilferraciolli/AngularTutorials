import { AbstractControl } from '@angular/forms';

export class StockValidators {

  // custom validator that will take whichever form control that is assigned to within the array of validators
  static checkBranch(control: AbstractControl) {
    // pattern to check if matches 1 letter and 3 numbers
    const regexp = /^[a-z]\d{3}$/i;
    const valid = regexp.test(control.value);

    return valid ? null : { invalidBranch: true };
  }

  // custom validator that will take whichever form control group that is assigned to within the second parameter of a form builder.
  // validation is to check that an item is not already on a list
  static checkStockExists(control: AbstractControl) {
    // get form group
    const stockItem = control.get('stock');

    //get form group
    const selector = control.get('selector');

    // check both exists, before comparing them, if either are null, them do not attempt to validate
    if (!(stockItem && selector)) {
      return null;
    }

    // check that the stock already contains the value trying to be added
    const exists = stockItem.value.some((stock) => {
      return stock.product_id === parseInt(selector.value.product_id);
    });

    // return the stockExists validator if already i the list
    return exists ? { stockExists: true } : null;
  }
}
