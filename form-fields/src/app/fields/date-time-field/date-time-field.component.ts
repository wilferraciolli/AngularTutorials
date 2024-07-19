import { NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

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
export class DateTimeFieldComponent implements ControlValueAccessor, Validator  {
  @Input()
  label: string = '';
  @Input()
  type: string = 'text';
  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  public value: string = '';
  disabled: boolean = false;
  onChange: Function = (value: string) => {};
  onTouched: Function = () => {};

  control: FormControl = new FormControl('', Validators.required);

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
    const dateTime: string = control.value;
    // do validation here
    // console.log('Validating date: ', control);
    console.log('Validating date: ', control.value);
    // console.log('Validating date: ', date === '2024-01-01');
    // console.log('Validating date: ', date , '2024-01-01');

    if (dateTime === '2024-01-01T09:00') {
      console.log('Validation failed');
      return {
        cannotBeThisDateTime: {
          dateTime
        }
      };
    }

    if (!control.value || control.value === '') {
      return { required: true };
    }

    return null;
  }
}

