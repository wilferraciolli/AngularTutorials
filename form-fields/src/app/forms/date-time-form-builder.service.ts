import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateTimeForm } from './date-time.form';
import { DateTimeModel } from './date-time.model';

@Injectable({
  providedIn: 'root'
})
export class DateTimeFormBuilderService {
  private _formBuilder: FormBuilder = inject(FormBuilder);

  form: FormGroup<DateTimeForm>;

  constructor() {
    this.form = this._formBuilder.group<DateTimeForm>({
      date: this._formBuilder.control('2024-01-01'),
      time: this._formBuilder.control('09:00'),
      dateTime: this._formBuilder.control('2024-01-01T09:00')
      // dateTime: this.formBuilder.control('2024-01-01T09:00', {
      //   validators: [Validators.required]
      // })
    });
  }

  public setFormValue(): void {
    this.form.patchValue({
      date: '2024-01-01',
      time: '09:00',
      dateTime: '2024-01-01T09:00'
    });
  }

  public resetFormValue(): void {
    this.form.patchValue({
      date: '',
      time: '',
      dateTime: ''
    });
  }

  public getFormValue(): DateTimeModel {
    return {
      date: this.date.value,
      time: this.time.value,
      dateTime: this.dateTime.value
    };
  }

  get date(): FormControl<string | null> {
    return this.form.controls.date;
  }

  get time(): FormControl<string | null> {
    return this.form.controls.time;
  }

  get dateTime(): FormControl<string | null> {
    return this.form.controls.dateTime;
  }
}
