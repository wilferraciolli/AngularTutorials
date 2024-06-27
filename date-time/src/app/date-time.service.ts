import { Injectable } from '@angular/core';
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() {
  }

  public getDateFromUTCDateTime(): Date {
    return new Date();
  }

  public getTimeFromUTCDateTime(): Date {
    return new Date();
  }

  public getDateTime(utcDateTime: DateTime): string {
    console.log('received date ', utcDateTime);
    // const utcDateTime: string = '2024-05-01T09:00:00Z';
    const timeZone: string = 'Europe/London';

    // const date: Date = new Date(utcDateTime);
    // const timeZoneFmt = new Intl.DateTimeFormat('en-EG', {
    //   timeZone,
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZoneName: 'short',
    //   hour12: false
    // });

    // const formattedDateTime = timeZoneFmt.format(date);
    // console.log(formattedDateTime); // Output: January 1, 2024, 4:00:00 AM EST

    return utcDateTime.toString();
  }

  public getDateTime1(utcDateTime: string): string {
    console.log('received date ', utcDateTime);
    // const utcDateTime: string = '2024-05-01T09:00:00Z';
    const timeZone: string = 'Europe/London';

    const date: Date = new Date(utcDateTime);
    const timeZoneFmt = new Intl.DateTimeFormat('en-EG', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      hour12: false
    });

    const formattedDateTime = timeZoneFmt.format(date);
    console.log(formattedDateTime); // Output: January 1, 2024, 4:00:00 AM EST

    return formattedDateTime;
  }

}
