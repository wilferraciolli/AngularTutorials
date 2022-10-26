import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/prouct.interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector"
         [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <option
            *ngFor="let product of products"
            [value]="product.id">
            {{ product.name }}
          </option>
        </select>

        <stock-counter
          [step]="10"
          [min]="10"
          [max]="1000"
          formControlName="quantity">

        </stock-counter>

        <button type="button"
                [disabled]="stockExists || notSelected"
                (click)="onAdd()">
          Add stock
        </button>

        <div class="stock-selector__error"
             *ngIf="stockExists">
          Item already exists in the stock
        </div>
      </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input()
  parent: FormGroup;

  @Input()
  products: Product[];

  @Output()
  added = new EventEmitter<any>();


  get stockExists() {
    return (
      this.parent.hasError('stockExists')
      && this.parent.get('selector.product_id').dirty
    );
  }

  get notSelected(){
    return !(this.parent.get('selector.product_id').value);
  }

  onAdd() {
    //  console.log('Form value for the stock selector ', this.parent.get('selector').value);

    // emitt and event passing the value of the this part of the form
    this.added.emit(this.parent.get('selector').value);

    //reset the status of the select form after an item was added (resetValue/setValue wants all of the formControls to be passed in, use patchValue for optional fields - just remember that patch wont set the form back to prestine)
    this.parent.get('selector').reset({
      product_id: '',
      quantity: 10
    });
  }
}
