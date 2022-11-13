import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.scss']
})
export class MonthlyViewComponent implements OnInit {
  viewDate: Date = new Date();
  public events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.events[0] = {
      id: 1,
      start: new Date(),
      end: new Date(),
      title: 'Event title'
    };

    this.events[1] = {
      id: 2,
      start: new Date(),
      end: new Date(),
      title: 'MAria G 9-5'
    };
  }

}
