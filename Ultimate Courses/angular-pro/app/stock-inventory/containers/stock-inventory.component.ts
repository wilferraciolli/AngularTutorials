import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { Product } from '../models/prouct.interface';

import 'rxjs/add/observable/forkJoin';
import { StockInventoryService } from '../services/stock-inventory.service';


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
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div>
          Total: {{ total | currency: 'USD': true }}
        </div>

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
export class StockInventoryComponent implements OnInit {

  products: Product[] = [];

  productMap: Map<number, Product>; // created to manage ids and their products

  total: number;

  constructor(
    private fb: FormBuilder,
    private stockInventoryService: StockInventoryService
  ) {
  }

  public ngOnInit(): void {
    // get all of the stock items (cart and products)
    const cart = this.stockInventoryService.getCartItems();
    const products = this.stockInventoryService.getProducts();

    Observable
    .forkJoin(cart, products)
    .subscribe(([cart, products]: [Item[], Product[]]) => {
      // merge both arrays to pass it down to the form array
      const myProductsMap = products.map<[number, Product]>(product => [product.id, product]);
      console.log('The for join of cart and products is ', myProductsMap);

      // populate the products to the map
      this.productMap = new Map<number, Product>(myProductsMap);
      this.products = products;

      // populate the cart
      cart.forEach(item => this.addStock(item));
      // initialy populate the value of the cart items
      this.calculateTotal(this.form.get('stock').value);

      // subscribe to the reactive form value changes, this case we only care for the Stock from control. This will pass the before and after values
      this.form.get('stock')
          .valueChanges.subscribe(value => {
        // console.log('Form changed value ', value);
        this.calculateTotal(value);
      });
    });
  }

  // create a form, the formGroup is called 'form', the formGoupName is called 'store' and formControlName will be each property
  form = this.fb.group({
    //first form group name
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    //second form group name
    selector: this.createStock({}),
    //third form group name
    stock: this.fb.array([])
  });

  createStock(stock): FormGroup {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  calculateTotal(value: Item[]) {
    // calculate the total value of products and its quantities
    const total = value.reduce((prev: Item, next: Item) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);

    this.total = total;
  }

  public addStock(stock: any) {
   // console.log('received event to add from child ', stock);

    // this event handler will take the values from stock-selector and push it onto the stock-products
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  public removeStock({ group, index }: { group: FormGroup, index: number }) {
   // console.log('Received event to delete from child ', group, index);

    // this event handler will take the values from stock-products and remove itfrom the stock-products
    const control = this.form.get('stock') as FormArray;
    // this is removing by index, but it could also be that the FormControol value of the product it can be fetched
    control.removeAt(index);
  }

  public onSubmit() {
    console.log('Submit ', this.form.value);
  }
}
