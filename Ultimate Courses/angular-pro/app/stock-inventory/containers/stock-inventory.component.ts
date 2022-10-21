import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form"
            (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form">
        </stock-selector>

        <stock-products
          [parent]="form">
        </stock-products>

        <div class="stock-inventory__buttons">
          <button type="submit"
                  [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent {
  // create a form, the formGroup is called 'form', the formGoupName is called 'store' and formControlName will be each property
  form = new FormGroup({
    //first form group name
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl('')
    }),
    //second form group name
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    }),
    //third form group name
    stock: new FormArray([])
  });

  public onSubmit() {
    console.log('Submit ', this.form.value);
  }
}
