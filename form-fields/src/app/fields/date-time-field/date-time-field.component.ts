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
  DATE_TIME_FIELD_TYPE,
  DATE_TIME_LABEL,
  DATE_TIME_MAX_END,
  DATE_TIME_MAX_END_ERROR_LABEL,
  DATE_TIME_MIN_START,
  DATE_TIME_MIN_START_ERROR_LABEL
} from './date-time.constants';

@Component({
  selector: 'app-date-time-field',
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
      useExisting: forwardRef(() => DateTimeFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateTimeFieldComponent
    }
  ],
  templateUrl: './date-time-field.component.html',
  styleUrl: './date-time-field.component.scss'
})
export class DateTimeFieldComponent implements ControlValueAccessor, Validator {
  @Input({
    required: false
  })
  public label: string = DATE_TIME_LABEL;

  @Input({
    required: false
  })
  min: string = DATE_TIME_MIN_START;

  @Input({
    required: false
  })
  minDateTimeErrorLabel: string = DATE_TIME_MIN_START_ERROR_LABEL;

  @Input({
    required: false
  })
  max: string = DATE_TIME_MAX_END;

  @Input({
    required: false
  })
  maxDateTimeErrorLabel: string = DATE_TIME_MAX_END_ERROR_LABEL;

  // Required validation can be done by the parent
  @Input({
    required: false
  })
  required: boolean = false;

  public fieldType: string = DATE_TIME_FIELD_TYPE;

  public value: string = '';
  disabled: boolean = false;
  onChange: Function = (value: string) => {
  };
  onTouched: Function = () => {
  };

  public errorRequired: WritableSignal<boolean> = signal(false);
  public errorCannotBeBeforeMinDateTime: WritableSignal<boolean> = signal(false);
  public errorCannotBeAfterMaxDateTime: WritableSignal<boolean> = signal(false);

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

    const dateTime: string = control.value;

    // if field is required then validate for empty
    if (this.required && (!dateTime || dateTime === '')) {
      this.errorRequired.set(true);
      return {
        required: true
      };
    }

    // if there is a date and time, then validate
    if (dateTime) {
      // if chosen date time is before the min
      if (this.min && dateTime < this.min) {
        this.errorCannotBeBeforeMinDateTime.set(true);
        return {
          cannotBeBeforeMinDateTime: {
            dateTime
          }
        };
      }

      // if chosen date time is after max
      if (this.max && dateTime > this.max) {
        this.errorCannotBeAfterMaxDateTime.set(true);
        return {
          cannotBeAfterMaxDateTime: {
            dateTime
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

    if (this.errorCannotBeBeforeMinDateTime) {
      this.errorCannotBeBeforeMinDateTime.set(false);
    }

    if (this.errorCannotBeAfterMaxDateTime) {
      this.errorCannotBeAfterMaxDateTime.set(false);
    }
  }
}

