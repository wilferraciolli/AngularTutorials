import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
          [parent]="form"
          (removed)="removeStock($event)">
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

  constructor(private fb: FormBuilder) {
  }

  // create a form, the formGroup is called 'form', the formGoupName is called 'store' and formControlName will be each property
  form =this.fb.group({
    //first form group name
    store:this.fb.group({
      branch: '',
      code: ''
    }),
    //second form group name
    selector: this.createStock({}),
    //third form group name
    stock: this.fb.array([
      this.createStock({ product_id: 1, quantity: 10 }),
      this.createStock({ product_id: 3, quantity: 50 })
    ])
  });

  createStock(stock): FormGroup {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  public addStock(stock: any) {
    console.log('received event to add from child ', stock);

    // this event handler will take the values from stock-selector and push it onto the stock-products
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  public removeStock({ group, index }: { group: FormGroup, index: number }) {
    console.log('Received event to delete from child ', group, index);

    // this event handler will take the values from stock-products and remove itfrom the stock-products
    const control = this.form.get('stock') as FormArray;

    // this is removing by index, but it could also be that the FormControol value of the product it can be fetched
    control.removeAt(index);
  }

  public onSubmit() {
    console.log('Submit ', this.form.value);
  }
}
