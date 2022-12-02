import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../../models';
import { getSpinner } from '../../../state/spinner/spiner.selectors';
import { StartSpinner, StopSpinner } from '../../../state/spinner/spinner.actions';
import { State } from '../../state';
import { EventService } from '../../services/event.service';
import { AddAttendee, LoadAttendees } from '../../state/attendees/attendees.actions';
import { getAttendees } from '../../state/attendees/attendees.selector';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner$: Observable<boolean> = of(false);
  attendees$: Observable<Attendee[]> = of([]);

  constructor(
    private store: Store<State>,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.attendees$ = this.store.pipe(select(getAttendees));
    this.store.dispatch(new LoadAttendees());
  }

  public addAttendee(attendee: Attendee) {
    this.store.dispatch(new AddAttendee(attendee));
  }
}
