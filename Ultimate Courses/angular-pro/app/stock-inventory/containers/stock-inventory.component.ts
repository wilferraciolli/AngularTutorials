import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form"
            (ngSubmit)="onSubmit()">
        <!-- Create the form and assign the names of the form gorup and bind to properties -->
        <div formGroupName="store">
          <input type="text"
                 placeholder="Branch id"
                 formControlName="branch"
          >
          <input type="text"
                 placeholder="Manager code"
                 formControlName="code"
          >
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
export class StockInventoryComponent {

  // create a form, the formGroup is called 'form', the formGoupName is called 'store' and formControlName will be each property
  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('B18'),
      code: new FormControl('1234')
    })
  });

  public onSubmit() {
    console.log('Submit ', this.form.value);
  }
}
