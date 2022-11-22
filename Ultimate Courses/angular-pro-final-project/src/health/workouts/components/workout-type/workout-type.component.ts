import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// get values from the form so it can be manipulated on a different component
export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-type.component.scss'],
  template: `
    <div class="workout-type">
      <div
        class="workout-type__pane"
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)">
        <img src="/img/{{ selector }}.svg">
        <p>{{ selector }}</p>
      </div>
    </div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value: string;

  // basics to be able to manipulate the form (registerOnTouched, registerOnChange)
  private onTouch: Function;
  private onModelChange: Function;

  // when component is touched
  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  // when value was changed on the component
  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  // value passed to the form builder (initial value if any)
  writeValue(value: string) {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value); // update the form by triggering detect changes
    this.onTouch();
  }

}
