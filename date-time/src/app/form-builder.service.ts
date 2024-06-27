import { Injectable } from '@angular/core';
import { DateTimeService } from "./date-time.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DateTimeForm } from "./date-time.form";
import { DateTimeModel } from "./date-time.model";
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  public form: FormGroup<DateTimeForm>;

  constructor(
    private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService
  ) {
    this.form = this.formBuilder.group<DateTimeForm>({
        businessDate: this.formBuilder.nonNullable.control(DateTime.now(), {
          validators: [Validators.required]
        }),
        businessTime: this.formBuilder.nonNullable.control(DateTime.now(), {
          validators: [Validators.required]
        }),
        dateTime: this.formBuilder.nonNullable.control(DateTime.now(), {
          validators: [Validators.required]
        })
      }
    );
  }

  get businessDate(): FormControl<DateTime> {
    return this.form.controls.businessDate;
  }

  get businessTime(): FormControl<DateTime> {
    return this.form.controls.businessTime;
  }

  get dateTime(): FormControl<DateTime> {
    return this.form.controls.dateTime;
  }

  public populateFormValues(): void {
    this.form.patchValue({
      // businessDate: DateTime.fromISO('2024-06-30',  {zone: 'utc'}),
      businessDate: DateTime.now(),
      businessTime: DateTime.now(),
      // dateTime: '2024-06-01T08:00:00.00Z'
      dateTime: DateTime.utc()
    });
  }

  public getFormValueBeforeParsing(): DateTimeForm {
    return this.form.controls;
  }

  // public getFormValueParsed(): DateTimeModel {
  //   return new DateTimeModel(
  //     this.form.controls.date.value,
  //     this.form.controls.date.value,
  //     this.form.controls.time.value,
  //     this.form.controls.time.value,
  //     this.form.controls.dateTime.value,
  //     this.form.controls.dateTime.value
  //   )
  // }
}
