import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;

  public events: CalendarEvent[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.events = [
      {
        id: 1,
        start: startOfDay(new Date()),
        title: 'An event with no end date',
      },
      {
        id: 2,
        start: startOfDay(new Date()),
        end: new Date(),
        title: 'some event',
      }
    ]
  }

  public eventClicked(event: CalendarEvent): void {
    console.log('Event clicked details: ', event);
  }
}
