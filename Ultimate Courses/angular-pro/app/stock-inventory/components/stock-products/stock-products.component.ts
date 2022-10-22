import { Component, EventEmitter, Input, Output } from '@angular/core';
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

            <button type="button"
                    (click)="onRemove(item, i)">
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class StockProductsComponent {
  @Input()
  parent: FormGroup;

  @Output()
  removed = new EventEmitter<any>();

  public onRemove(group: any, index: number): void {
    console.log('Sendign event to remove item ', group, index);

    //emmit event when remove button was clicked, this will pass the details of the item being removed - The format is :{group: FormGroup, index: number}
    this.removed.emit({ group, index });
  }

  get stocks(): AbstractControl[] {
    return (this.parent.get('stock') as FormArray).controls;
  }
}
