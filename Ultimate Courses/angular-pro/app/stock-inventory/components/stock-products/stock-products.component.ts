import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
    <div class="stock-product"
         [formGroup]="parent">
      <div formArrayName="stock">
        <div *ngFor="let item of stocks; let i = index;">

          <!-- pass the index as form array need the index to get the item -->
          <div class="stock-product__content"
               [formGroupName]="i">
            <div class="stock-product__name">
              {{ item.value.product_id }}
            </div>

            <input type="number"
                   step="10"
                   min="10"
                   max="1000"
                   formControlName="quantity">

            <button type="button"> Remove</button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class StockProductsComponent {
  @Input()
  parent: FormGroup;

  get stocks(): AbstractControl[] {
    return (this.parent.get('stock') as FormArray).controls;
  }

}
