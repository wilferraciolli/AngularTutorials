import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DateTimeTimezoneFormComponent} from './components/date-time-timezone-form/date-time-timezone-form.component';
import {DateTimeService} from './fields/date-time-field/date-time.service';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FullFormComponent} from "./components/full-form/full-form.component";
import {DateTimeFormComponent} from "./components/date-time-form/date-time-form.component";
import {UtcDateTimeFormComponent} from "./components/utc-date-time-form/utc-date-time-form.component";
import {
  UtcDateTimeCustomFormComponent
} from "./components/utc-date-time-custom-form/utc-date-time-custom-form.component";

@Component({
  selector: 'app-root',
  imports: [
    MatTabGroup,
    MatTab,
    ReactiveFormsModule,
    FullFormComponent,
    DateTimeFormComponent,
    DateTimeTimezoneFormComponent,
    UtcDateTimeFormComponent,
    UtcDateTimeCustomFormComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _dateTimeService: DateTimeService = inject(DateTimeService);

  constructor() {
  }

  public ngOnInit(): void {
    console.log('users timezone: ', this._dateTimeService.resolveUsersTimezone());

    // console.log('timezone Europe/London');
    // console.log('timezone Europe/London: 9', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'Europe/London'));
    // console.log('timezone Europe/London: 10', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'Europe/London'));
    // console.log('timezone Europe/London: 9', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'Europe/London'));
    //
    // console.log('timezone Europe/London: 9', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'Europe/London'));
    // console.log('timezone Europe/London: 8', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'Europe/London'));
    // console.log('timezone Europe/London: 9', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'Europe/London'));
    //
    // console.log('23:01:');
    // console.log('timezone Europe/London: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T23:01:00Z', 'Europe/London'));
    // console.log('timezone Europe/London: 00', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T23:01:00Z', 'Europe/London'));
    // console.log('timezone Europe/London: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T23:01:00Z', 'Europe/London'));
    //
    // console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T23:01', 'Europe/London'));
    // console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-02T00:01', 'Europe/London'));
    // console.log('timezone Europe/London: 23', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T23:01', 'Europe/London'));
    //
    // console.log('timezone Asia/Nicosia');
    // console.log('timezone Asia/Nicosia: 11', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 12', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 11', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'Asia/Nicosia'));
    //
    // console.log('timezone Asia/Nicosia: 7', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 6', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 7', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'Asia/Nicosia'));
    //
    // console.log('timezone Asia/Nicosia: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T21:01:00Z', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 00', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T21:01:00Z', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T21:01:00Z', 'Asia/Nicosia'));
    //
    // console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T23:01', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-02T00:01', 'Asia/Nicosia'));
    // console.log('timezone Asia/Nicosia: 21', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T23:01', 'Asia/Nicosia'));
    //
    // console.log('America/Sao_Paulo');
    // console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T09:00:00Z', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T09:00:00Z', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 6', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T09:00:00Z', 'America/Sao_Paulo'));
    //
    // console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-01-01T09:00', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-09-01T09:00', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 12', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-11-01T09:00', 'America/Sao_Paulo'));
    //
    // console.log('23: Sao Paulo');
    // console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-01-01T02:01:00Z', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-09-01T02:01:00Z', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 23', this._dateTimeService.parseUTCDateTimeToTimezone('2024-11-01T02:01:00Z', 'America/Sao_Paulo'));
    //
    // console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2023-12-31T23:01', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-08-31T23:01', 'America/Sao_Paulo'));
    // console.log('timezone America/Sao_Paulo: 02', this._dateTimeService.parseDateTimeFromTimezoneToUTC('2024-10-31T23:01', 'America/Sao_Paulo'));
  }
}
