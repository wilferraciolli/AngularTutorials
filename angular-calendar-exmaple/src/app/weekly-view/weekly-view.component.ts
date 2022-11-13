import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  public events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.events[0] = {
      id: 1,
      start: new Date(),
      end: new Date(),
      title: 'Event title'
    };
  }

}
