import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { DateTimeFieldComponent } from './fields/date-time-field/date-time-field.component';
import { DateTimeService } from './fields/date-time-field/date-time.service';
import { TimeFieldComponent } from './fields/time-field/time-field.component';
import { DateTimeFormBuilderService } from './forms/date-time-form-builder.service';
import { DateTimeForm } from './forms/date-time.form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ReactiveFormsModule, DateFieldComponent, JsonPipe, NgIf, TimeFieldComponent,
    DateTimeFieldComponent, MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _dateTimeFormBuilder: DateTimeFormBuilderService = inject(DateTimeFormBuilderService);
  private _dateTimeService: DateTimeService = inject(DateTimeService);

  public form: FormGroup<DateTimeForm>;

  constructor() {
    this.form = this._dateTimeFormBuilder.form;
  }

  public ngOnInit(): void {
    console.log('users timezone: ', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone Europe/London: 9', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'Europe/London'));
    console.log('timezone Europe/London: 10', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'Europe/London'));
    console.log('timezone Europe/London: 9', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'Europe/London'));

    console.log('timezone Europe/London: 9', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'Europe/London'));
    console.log('timezone Europe/London: 8', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'Europe/London'));
    console.log('timezone Europe/London: 9', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'Europe/London'));

    console.log('23:01: ', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone Europe/London: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T23:01:00Z', 'Europe/London'));
    console.log('timezone Europe/London: 00', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T23:01:00Z', 'Europe/London'));
    console.log('timezone Europe/London: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T23:01:00Z', 'Europe/London'));

    console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T23:01', 'Europe/London'));
    console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-02T00:01', 'Europe/London'));
    console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T23:01', 'Europe/London'));


    console.log('users timezone: ', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone Asia/Nicosia: 11', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 12', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 11', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'Asia/Nicosia'));

    console.log('timezone Asia/Nicosia: 7', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 6', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 7', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'Asia/Nicosia'));

    console.log('21:01:Asia/Nicosia ', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone Asia/Nicosia: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T21:01:00Z', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 00', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T21:01:00Z', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T21:01:00Z', 'Asia/Nicosia'));

    console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T23:01', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-02T00:01', 'Asia/Nicosia'));
    console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T23:01', 'Asia/Nicosia'));


    console.log('users timezone: ', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'America/Sao_Paulo'));

    console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'America/Sao_Paulo'));

    console.log('23: Sao Paulo', this._dateTimeService.resolveUsersTimezone());
    console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T02:01:00Z', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T02:01:00Z', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T02:01:00Z', 'America/Sao_Paulo'));

    console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2023-12-31T23:01', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-08-31T23:01', 'America/Sao_Paulo'));
    console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-10-31T23:01', 'America/Sao_Paulo'));
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

  public onSubmit(): void {
    console.log('Submitting form ', this._dateTimeFormBuilder.getFormValue());
  }

  public shouldDisableSubmit(): boolean {
    return this.form.invalid
      || this.form.untouched;
  }

  public resetForm(): void {
    this._dateTimeFormBuilder.resetFormValue();
  }
}
