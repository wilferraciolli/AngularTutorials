import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { DateTimeFieldComponent } from '../../fields/date-time-field/date-time-field.component';
import { DateTimeService } from '../../fields/date-time-field/date-time.service';
import { TimeZone } from '../date-time-form/timezone';

@Component({
  selector: 'app-date-time-timezone-form',
  standalone: true,
  imports: [
    DateTimeFieldComponent,
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatButton
    // MatCardModule
  ],
  templateUrl: './date-time-timezone-form.component.html',
  styleUrl: './date-time-timezone-form.component.scss'
})
export class DateTimeTimezoneFormComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _dateTimeService: DateTimeService = inject(DateTimeService);

  form: FormGroup;

  public timezones: TimeZone[] = [
    { id: 'Europe/London', value: 'London' },
    { id: 'Asia/Nicosia', value: 'Nicosia' },
    { id: 'Europe/Athens', value: 'Athens' },
    { id: 'America/Sao_Paulo', value: 'Sao Paulo' }
  ];

  public selectedTimezone: string = 'Europe/London';

  // public dateTimeInUtc: string = '2024-06-01T09:00:00Z';

  constructor() {
    let convertedDateTime: string = this._dateTimeService.parseUTCDateTimeToTimezone(
      '2024-05-01T09:00:00Z',
      this.selectedTimezone);

    let convertedDateTimeUK: string = this._dateTimeService.parseUTCDateTimeToTimezone(
      '2024-05-01T09:00:00Z',
      'Europe/London');

    let convertedDateTimeCY: string = this._dateTimeService.parseUTCDateTimeToTimezone(
      '2024-05-01T09:00:00Z',
      'Asia/Nicosia');

    let convertedDateTimeBR: string = this._dateTimeService.parseUTCDateTimeToTimezone(
      '2024-05-01T09:00:00Z',
      'America/Sao_Paulo');

    this.form = this._formBuilder.group({
      dateTimeInUtc: '2024-06-01T09:00:00Z',
      dateTime: this._formBuilder.control(convertedDateTime),
      dateTimeUK: this._formBuilder.control(convertedDateTimeCY),
      dateTimeCY: this._formBuilder.control(convertedDateTimeCY),
      dateTimeBR: this._formBuilder.control(convertedDateTimeBR)
      // dateTime: this._formBuilder.control('2024-05-01T09:00')
      // dateTime: this.formBuilder.control('2024-01-01T09:00', {
      //   validators: [Validators.required]
      // })
    });
  }

  get dateTime(): any {
    return this.form.controls['dateTime'];
  }

  get dateTimeInUTC(): any {
    return this.form.controls['dateTimeInUtc'];
  }

  public updateForm(): void {
    // return this._dateTimeService.parseDateTimeFromTimezoneToUTC(this.dateTime.value, this.selectedTimezone);
    this.form.patchValue({
      dateTime:
        this._dateTimeService.parseUTCDateTimeToTimezone(this.dateTimeInUTC.value, this.selectedTimezone),
      dateTimeUK:
        this._dateTimeService.parseUTCDateTimeToTimezone(this.dateTimeInUTC.value, 'Europe/London'),
      dateTimeCY:
        this._dateTimeService.parseUTCDateTimeToTimezone(this.dateTimeInUTC.value, 'Asia/Nicosia'),
      dateTimeBR:
        this._dateTimeService.parseUTCDateTimeToTimezone(this.dateTimeInUTC.value, 'America/Sao_Paulo')
    });
  }

  public convertFromUTCToTimeZone(timezone: string): string {
    return this._dateTimeService.parseUTCDateTimeToTimezone(this.dateTimeInUTC.value, timezone);
  }
}
