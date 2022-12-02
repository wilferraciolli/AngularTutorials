import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../../models';
import { EventService } from '../../services/event.service';
import { EventState } from '../../state';
import { AddAttendee, LoadAttendees } from '../../state/attendees/attendees.actions';
import { getAttendees, getFilteredAttendees } from '../../state/attendees/attendees.selector';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner$: Observable<boolean> = of(false);
  attendees$: Observable<Attendee[]> = of([]);

  constructor(
    private store: Store<EventState>,
    private eventService: EventService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.attendees$ = this.store.pipe(select(getFilteredAttendees));
    this.store.dispatch(new LoadAttendees());
  }

  public addAttendee(attendee: Attendee) {
    this.store.dispatch(new AddAttendee(attendee));
  }

  navigate(filterBy: string){
    this.router.navigateByUrl(`/event?filterBy=${filterBy}`);
  }
}
