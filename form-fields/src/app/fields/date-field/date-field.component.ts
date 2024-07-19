import { NgIf } from '@angular/common';
import { Component, forwardRef, Input, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { DATE_TIME_MAX_END, DATE_TIME_MIN_START } from '../date-time-field/date-time.constants';
import { TIME_LABEL } from '../time-field/time.constants';
import {
  DATE_FIELD_TYPE,
  DATE_LABEL,
  DATE_MAX_END,
  DATE_MAX_END_ERROR_LABEL,
  DATE_MIN_START,
  DATE_MIN_START_ERROR_LABEL
} from './date.constants';


@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatInput
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateFieldComponent
    }
  ],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DateFieldComponent implements ControlValueAccessor, Validator {
  @Input({
    required: false
  })
  public label: string = DATE_LABEL;

  @Input({
    required: false
  })
  min: string = DATE_MIN_START;

  @Input({
    required: false
  })
  minDateErrorLabel: string = DATE_MIN_START_ERROR_LABEL;

  @Input({
    required: false
  })
  max: string = DATE_MAX_END;

  @Input({
    required: false
  })
  maxDateErrorLabel: string = DATE_MAX_END_ERROR_LABEL;

  // Required validation can be done by the parent
  @Input({
    required: false
  })
  required: boolean = false;

  public fieldType: string = DATE_FIELD_TYPE;
  public value: string = '';
  public disabled: boolean = false;
  // public control: FormControl = new FormControl('', this.validate.bind(this));

  public errorRequired: WritableSignal<boolean> = signal(false);
  public errorCannotBeBeforeMinDate: WritableSignal<boolean> = signal(false);
  public errorCannotBeAfterMaxDate: WritableSignal<boolean> = signal(false);

  onChange: Function = (value: string) => {
  };
  onTouched: Function = () => {
  };

  /**
   * Write value method is used only during initialization to set the value.
   * @param newValue
   */
  public writeValue(newValue: any): void {
    console.log('Writing value ', newValue);
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched(newValue);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.resetErrorsOnChange();

    const date: string = control.value;

    // if field is required then validate for empty
    if (this.required && (!date || date === '')) {
      this.errorRequired.set(true);
      return {
        required: true
      };
    }

    // if there is a date, then validate
    if (date) {
      // if chosen date is before the min
      if (this.min && date < this.min) {
        this.errorCannotBeBeforeMinDate.set(true);
        return {
          cannotBeBeforeMinDate: {
            date
          }
        };
      }

      // if chosen date is after max
      if (this.max && date > this.max) {
        this.errorCannotBeAfterMaxDate.set(true);
        return {
          cannotBeAfterMaxDate: {
            date
          }
        };
      }
    }

    return null;
  }

  private resetErrorsOnChange(): void {
    // since it can be called before component initializes, then check if not null
    if (this.errorRequired) {
      this.errorRequired.set(false);
    }

    if (this.errorCannotBeBeforeMinDate) {
      this.errorCannotBeBeforeMinDate.set(false);
    }

    if (this.errorCannotBeAfterMaxDate) {
      this.errorCannotBeAfterMaxDate.set(false);
    }
  }
}
