import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../../models';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  attendees$: Observable<Attendee[]> = of([]);

  constructor(
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.getAttendees();
  }

  public addAttendee(attendee: Attendee) {
    this.eventService.addAttendee(attendee);
  }

  private getAttendees() {
    this.attendees$ = this.eventService.getAttendees();
  }
}
