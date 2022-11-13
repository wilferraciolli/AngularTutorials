import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {
  viewDate: Date = new Date();
  public events: CalendarEvent[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.events[0] = {
      id: 1,
      start: new Date(),
      end: new Date(),
      title: 'Event title'
    };
  }

}
