import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DateTime } from "luxon";

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
  private _controlName!: string;
  private _dateTime!: string;

  @Input() set controlName(value: string) {
    this._controlName = value;
    this.updateForm();
  }

  @Input() set dateTime(value: string) {
    this._dateTime = value;
    this.updateForm();
  }

  private touched: boolean = false;
  formGroup!: FormGroup;
  businessDateControl!: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      businessDate: this.businessDateControl = new FormControl(
        DateTime.fromISO(this._dateTime, { zone: 'utc' })),
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private updateForm(): void {
    if (this._dateTime) {
      console.log('***************** setting date time ', this._dateTime)
      this.businessDateControl.setValue(DateTime.fromISO(this._dateTime, { zone: 'utc' }));
    }
  }

  // write method called by Angular Forms when initialized
  writeValue(value: DateTime): void {
    console.log('write value Called in with ', value);
    console.log('value.toJSON(): ', value.toJSON());

    let fromISO = DateTime.fromISO('2024-01-01T09:00:00Z', { zone: 'utc' });
    console.log('fromISO: ', fromISO);
    console.log('fromISO.toJSON(): ', fromISO.toJSON());
    console.log('fromISO.toJSDate(): ', fromISO.toJSDate());

    this.businessDateControl.setValue(fromISO.toJSDate());
  }

  // holder function to deal with on touch
  onTouched: any = () => {
  };

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.businessDateControl.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.businessDateControl.disable();
    } else {
      this.businessDateControl.enable();
    }
  }
}
