import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private _DEFAULT_TIMEZONE: string = 'Europe/London';
  private _CYPRUS_TIMEZONE: string = 'Asia/Nicosia';
  private _UTC_TIMEZONE: string = 'UTC';

  constructor() {
  }

  /**
   * Parse a date time UTC YYYY-MM-DDThh:mm:ssZ into a timezone free string in the format of YYYY-MM-DDThh:mm.
   * @param dateTimeInUtc date and time in the format YYYY-MM-DDThh:mm:ssZ
   * @param timeZone the desired timezone, Eg 'Europe/London'
   * Return a string with the date and time parsed as time zone free in the format as YYYY-MM-DDThh:mm.
   */
  public parseUTCDateTimeToTimezone(dateTimeInUtc: string, timeZone: string): string {
    const dt = DateTime.fromISO(dateTimeInUtc, { zone: 'utc' });
    const dtInTimeZone = dt.setZone(timeZone);

    const year = dtInTimeZone.year;
    const month = dtInTimeZone.month.toString().padStart(2, '0');
    const day = dtInTimeZone.day.toString().padStart(2, '0');
    const hour = dtInTimeZone.hour.toString().padStart(2, '0');
    const minute = dtInTimeZone.minute.toString().padStart(2, '0');

    const formattedString = `${year}-${month}-${day}T${hour}-${minute}`;
    return formattedString;
  }

  public parseUTCDateTimeToTimezone0(dateTimeInUtc: string, timeZone: string): string {
    // split the date and time
    const dateTimeParts = dateTimeInUtc.split('T');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');

    // create UTC date
    const date = new Date(
      Date.UTC(
        parseInt(dateParts[0], 10),
        parseInt(dateParts[1], 10) - 1, // Months are 0-based
        parseInt(dateParts[2], 10),
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10)
      )
    );

    date.toLocaleTimeString('en-GB', { timeZone });

    const year: string = date.toLocaleDateString('en-GB', { year: 'numeric' });
    const month: string = date.toLocaleDateString('en-GB', { month: '2-digit' });
    const day: string = date.toLocaleDateString('en-GB', { day: '2-digit' });
    const time: string = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const formattedString: string = `${ year }-${ month }-${ day }T${ time.replace(/:/, '-') }`;

    return formattedString;
  }

  public parseDateTimeFromTimezoneToUTC(dateTime: string, timeZone: string): string {
    const dateParts: string[] = dateTime.split(/[-T]/); // get the date values and add time values to the end
    const year: number = parseInt(dateParts[0], 10);
    const month: number = parseInt(dateParts[1], 10) - 1; // months are zero-based
    const day: number = parseInt(dateParts[2], 10);

    const timeParts: string[] = dateParts[3].split(':'); // get the time value from the date values and split onto minute and secs
    const hour: number = parseInt(timeParts[0], 10);
    const minute: number = parseInt(timeParts[1], 10);

    // create a date from the input
    const date = new Date(
      Date.UTC(year, month, day, hour, minute, 0, 0) // 0 for seconds and milliseconds
    );

    // work out the offset, ideally we already know the timezone so we should be able to just get the offset from it
    let utcDate: Date = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    let tzDate: Date = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
    let offset: number = utcDate.getTime() - tzDate.getTime();
    date.setTime(date.getTime() + offset);

    const utcString: string = date.toISOString();

    return utcString.replace('.000Z', 'Z');
  }

  public resolveUsersTimezone(): string {
    let timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone) {
      return timeZone;
    }

    return this._DEFAULT_TIMEZONE;
  }

  private _get_timezoneOffset(timeZone: string): number {
    // You can use a library like moment-timezone or implement your own timezone offset calculation
    // For simplicity, I'll use a hard-coded offset for Europe/London
    const offsets: any = {
      'Europe/London': 0 // GMT+0
    };
    return offsets[timeZone];
  }
}
