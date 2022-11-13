import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  constructor() { }

  ngOnInit(): void {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      id: 1,
      start: startOfDay(new Date()),
      title: 'An event with no end date',
    },
    {
      id: 2,
      start: startOfDay(new Date()),
      title: 'Second event',
    },
    {
      id: 3,
      start: startOfDay(new Date()),
      end: new Date(),
      title: 'Third event',
    }
  ]

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Date of event ', date);
    console.log('Events for the date ', events);
    //this.openAppointmentList(date)
  }

  public eventClicked(event: CalendarEvent) {
    console.log('Event clicked weekly details ', event);
  }

  public eventClickedDay(event: CalendarEvent) {
    console.log('Event clicked daily details ', event);
  }
}
