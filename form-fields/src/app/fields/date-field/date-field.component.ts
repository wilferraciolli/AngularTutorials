import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, FormsModule, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-date-field',
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
      useExisting: forwardRef(() => DateFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateFieldComponent
    }
  ],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent implements ControlValueAccessor, Validator  {
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
  // private _touched: boolean = false;

  control: FormControl = new FormControl('', Validators.required);
  //
  // get value(): string {
  //   return this.control.value;
  // }
  //
  // set value(val: string) {
  //   this.control.setValue(val);
  //   this.valueChange.emit(val);
  // }

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

  // public markAsTouched(): void {
  //   if (!this._touched) {
  //     this._touched = true;
  //     this.onTouched();
  //   }
  // }

  validate(control: AbstractControl): ValidationErrors | null {
    const date: string = control.value;
    // do validation here
    // console.log('Validating date: ', control);
    // console.log('Validating date: ', control.value);
    // console.log('Validating date: ', date === '2024-01-01');
    // console.log('Validating date: ', date , '2024-01-01');

    if (date === '2024-01-01') {
      console.log('Validation failed');
      return {
        cannotBeThisDate: {
          date
        }
      };
    }

    if (!control.value || control.value === '') {
      return { required: true };
    }

    return null;
  }
}
