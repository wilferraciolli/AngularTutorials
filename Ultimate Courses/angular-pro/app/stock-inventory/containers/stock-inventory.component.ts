import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product } from '../models/prouct.interface';


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
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
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

  products: Product[] = [
    { 'id': 1, 'price': 2800, 'name': 'MacBook Pro' },
    { 'id': 2, 'price': 50, 'name': 'USB-C Adaptor' },
    { 'id': 3, 'price': 400, 'name': 'iPod' },
    { 'id': 4, 'price': 900, 'name': 'iPhone' },
    { 'id': 5, 'price': 600, 'name': 'Apple Watch' }
  ];

  // create a form, the formGroup is called 'form', the formGoupName is called 'store' and formControlName will be each property
  form = new FormGroup({
    //first form group name
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl('')
    }),
    //second form group name
    selector: this.createStock({}),
    //third form group name
    stock: new FormArray([
      this.createStock({ product_id: 1, quantity: 10 }),
      this.createStock({ product_id: 3, quantity: 50 })
    ])
  });

  createStock(stock): FormGroup {
    return new FormGroup({
      product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
      quantity: new FormControl(stock.quantity || 10)
    });
  }

  public addStock(stock: any) {
    console.log('received event from child ', stock);

    // this event handler will take the values from stock-selector and push it onto the stock-products
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock))
  }

  public onSubmit() {
    console.log('Submit ', this.form.value);
  }
}
