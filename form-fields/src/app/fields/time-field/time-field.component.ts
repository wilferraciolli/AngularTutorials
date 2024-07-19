import { NgIf } from '@angular/common';
import { Component, forwardRef, Input, signal, WritableSignal } from '@angular/core';
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
import {
  TIME_FIELD_TYPE,
  TIME_LABEL,
  TIME_MAX_END, TIME_MAX_END_ERROR_LABEL,
  TIME_MIN_START,
  TIME_MIN_START_ERROR_LABEL
} from './time.constants';

@Component({
  selector: 'app-time-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TimeFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TimeFieldComponent
    }
  ],
  templateUrl: './time-field.component.html',
  styleUrl: './time-field.component.scss'
})
export class TimeFieldComponent implements ControlValueAccessor, Validator {
  @Input({
    required: false
  })
  public label: string = TIME_LABEL;

  @Input({
    required: false
  })
  min: string = TIME_MIN_START;

  @Input({
    required: false
  })
  minTimeErrorLabel: string = TIME_MIN_START_ERROR_LABEL;

  @Input({
    required: false
  })
  max: string = TIME_MAX_END;

  @Input({
    required: false
  })
  maxTimeErrorLabel: string = TIME_MAX_END_ERROR_LABEL;

  @Input({
    required: false
  })
  required: boolean = false;

  public fieldType: string = TIME_FIELD_TYPE;
  public value: string = '';
  disabled: boolean = false;

  public errorRequired: WritableSignal<boolean> = signal(false);
  public errorCannotBeBeforeMinTime: WritableSignal<boolean> = signal(false);
  public errorCannotBeAfterMaxTime: WritableSignal<boolean> = signal(false);

  onChange: Function = (value: string) => {
  };
  onTouched: Function = () => {
  };

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

    const time: string = control.value;

    // if field is required then validate for empty
    if (this.required && (!time || time === '')) {
      this.errorRequired.set(true);
      return {
        required: true
      };
    }

    if (time) {
      // if chosen date is before the min
      if (this.min && time < this.min) {
        this.errorCannotBeBeforeMinTime.set(true);
        return {
          cannotBeBeforeMinTime: {
            time
          }
        };
      }

      // if chosen date is after max
      if (this.max && time > this.max) {
        this.errorCannotBeAfterMaxTime.set(true);
        return {
          cannotBeAfterMaxTime: {
            time
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

    if (this.errorCannotBeBeforeMinTime) {
      this.errorCannotBeBeforeMinTime.set(false);
    }

    if (this.errorCannotBeAfterMaxTime) {
      this.errorCannotBeAfterMaxTime.set(false);
    }
  }
}
