import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrl: './date-time-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateTimeFieldComponent),
    },
  ]
})
export class DateTimeFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input({
    required: true
  })
  public controlName!: string;

  @Input({
    required: true
  })
  public dateTime!: string;

  private touched: boolean = false;
  disabled!: boolean;
  value: string = '';

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public valueChanged(value: string): void {
    console.log('Value changed ', value);
    this.onChange(value);

    this.markAsTouched();
  }

  writeValue(value: string): void {
    console.log('write value , dateTime ', value);
    this.value = value;
  }

  // holder function to deal with on touch
  onTouched: any = () => {
  };
  onChange = (val: string) => {
  };

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
