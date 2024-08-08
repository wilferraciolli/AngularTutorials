import { Component, inject } from '@angular/core';
import { DateTimeFieldComponent } from "../../fields/date-time-field/date-time-field.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect, MatSelectModule } from "@angular/material/select";
import { TimeZone } from "./timezone";
import { DateTimeForm } from "../../forms/date-time.form";
import { DateTimeService } from "../../fields/date-time-field/date-time.service";

@Component({
  selector: 'app-date-time-form',
  standalone: true,
  imports: [
    DateTimeFieldComponent,
    ReactiveFormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatSelectModule
  ],
  templateUrl: './date-time-form.component.html',
  styleUrl: './date-time-form.component.scss'
})
export class DateTimeFormComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _dateTimeService: DateTimeService = inject(DateTimeService);

  form: FormGroup;

  public timezones: TimeZone[] = [
    { id: 'Europe/London', value: 'London' },
    { id: 'Asia/Nicosia', value: 'Nicosia' },
    { id: 'Europe/Athens', value: 'Athens' },
    { id: 'America/Sao_Paulo', value: 'Sao Paulo' },
  ];

  public selectedTimezone: string = 'Europe/London';

  constructor() {
    this.form = this._formBuilder.group({
      dateTime: this._formBuilder.control('2024-05-01T09:00')
      // dateTime: this.formBuilder.control('2024-01-01T09:00', {
      //   validators: [Validators.required]
      // })
    });
  }

  get dateTime(): any {
    return this.form.controls['dateTime'];
  }

  public convertChosenDateTimeToUtc(): string {
    return this._dateTimeService.parseDateTimeFromTimezoneToUTC(this.dateTime.value, this.selectedTimezone);
  }
}
