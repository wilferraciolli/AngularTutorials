import { JsonPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Temporal } from 'temporal-polyfill';
import { UtcDateTimeFieldComponent } from '../../fields/utc-date-time-field/utc-date-time-field.component';
import { TimeZone } from '../date-time-form/timezone';

@Component({
  selector: 'app-utc-date-time-form',
  imports: [
    JsonPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    UtcDateTimeFieldComponent
  ],
  templateUrl: './utc-date-time-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './utc-date-time-form.component.scss'
})
export class UtcDateTimeFormComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);

  public timezones: TimeZone[] = [
    { id: 'Europe/London', value: 'London' },
    { id: 'Asia/Nicosia', value: 'Nicosia' },
    { id: 'Europe/Athens', value: 'Athens' },
    { id: 'America/Sao_Paulo', value: 'Sao Paulo' },
    { id: 'Asia/Kolkata', value: 'Kolkata (UTC+05:30)' },
    { id: 'Australia/Lord_Howe', value: 'Lord Howe (30 min DST)' }
  ];

  public selectedTimezone: string = 'Europe/London';

  public form: FormGroup = this._formBuilder.group({
    appointment: this._formBuilder.control<string | null>('2024-05-01T09:00:00Z')
  });

  get appointment(): string | null {
    return this.form.controls['appointment'].value;
  }

  public convertToTimeZone(timeZone: string): string {
    if (!this.appointment) {
      return '';
    }

    try {
      return Temporal.Instant.from(this.appointment)
        .toZonedDateTimeISO(timeZone)
        .toPlainDateTime()
        .toString({ smallestUnit: 'minute' })
        .replace('T', ' ');
    } catch {
      return '';
    }
  }
}
