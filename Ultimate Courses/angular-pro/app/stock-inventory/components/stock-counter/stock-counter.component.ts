import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// add keyboard input to get the control values to get change
const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div class="stock-counter">
      <div>
        <div>
          <p>{{ value }}</p>
          <div>
            <button
              type="button"
              (click)="increment()"
              [disabled]="value === max">
              +
            </button>
            <button
              type="button"
              (click)="decrement()"
              [disabled]="value === min">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockCounterComponent implements ControlValueAccessor {

  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  private onTouch: Function;
  private onModelChange: Function;

  value: number = 10;

  // fucntions to use with ControlValueAccessor, these are functions that reactive forms can give us
  registerOnTouched(fn) {
    // bind functions when value was touched
    this.onTouch = fn;
  }
  registerOnChange(fn) {
    // bind functions when value has changed
    this.onModelChange = fn;
  }
  writeValue(value) {
    // this is passed on to the form when crating it and defining the component
    this.value = value || 0;
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
