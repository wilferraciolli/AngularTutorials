import { Component, OnInit } from '@angular/core';
import { Attendee } from '../../../models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  attendees: Attendee[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  public addAttendee(attendee: Attendee) {
    // push attendees to the array
    this.attendees = [...this.attendees, attendee];
    console.log('Attendee added', attendee);
  }
}
