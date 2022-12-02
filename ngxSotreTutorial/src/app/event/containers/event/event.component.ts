import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../../models';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner$: Observable<boolean> = of(false);
  attendees$: Observable<Attendee[]> = of([]);

  constructor(
    private store: Store<any>,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.getAttendees();
    this.spinner$ = this.store
                        .pipe(select(state => state.spinner.isOn));
  }

  public addAttendee(attendee: Attendee) {
    // dispatch an action to the spinner
    this.store.dispatch({type: 'startSpinner'});

    // add new attendee, refresh the list of attendees and stop the spinner
    this.eventService.addAttendee(attendee)      .subscribe(() => {
      this.store.dispatch({type: 'stopSpinner'});
      this.getAttendees()
    });
  }

  private getAttendees() {
    this.attendees$ = this.eventService.getAttendees();
  }
}
