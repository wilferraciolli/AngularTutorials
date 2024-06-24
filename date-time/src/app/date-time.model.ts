import { FormControl } from "@angular/forms";

export class DateTimeModel {
  date: string;
  dateParsed: string;
  time: string;
  timeParsed: string;
  dateTime: string;
  dateTimeParsed: string;


  constructor(date: string, dateParsed: string, time: string, timeParsed: string, dateTime: string, dateTimeParsed: string) {
    this.date = date;
    this.dateParsed = dateParsed;
    this.time = time;
    this.timeParsed = timeParsed;
    this.dateTime = dateTime;
    this.dateTimeParsed = dateTimeParsed;
  }
}



