import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../../models';
import { getSpinner } from '../../../state/spinner/spiner.selectors';
import { StartSpinner, StopSpinner } from '../../../state/spinner/spinner.actions';
import { State } from '../../state';
import { EventService } from '../../services/event.service';
import { LoadAttendees } from '../../state/attendees/attendees.actions';
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
    this.store.dispatch(new LoadAttendees());
    this.spinner$ = this.store.pipe(select(getSpinner));
    this.attendees$ = this.store.pipe(select(getAttendees));
  }

  public addAttendee(attendee: Attendee) {
    // dispatch an action to the spinner
    this.store.dispatch(new StartSpinner());

    // add new attendee, refresh the list of attendees and stop the spinner
    this.eventService.addAttendee(attendee).subscribe(() => {
      this.store.dispatch(new StopSpinner());
    });
  }

  // private getAttendees() {
  //   this.attendees$ = this.eventService.getAttendees();
  // }
}
