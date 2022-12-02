import { Injectable } from '@angular/core';
// @ts-ignore
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Attendee } from '../../../models';

import { EventService } from '../../services/event.service';
import {
  AddAttendee,
  AddAttendeeFail,
  AddAttendeeSuccess,
  AttendeesActionTypes, FilterBy,
  LoadAttendees,
  LoadAttendeesFail,
  LoadAttendeesSuccess
} from './attendees.actions';

@Injectable()
export class AttendeesEffects {
  constructor(private actions$: Actions, private eventService: EventService) {
  }

  @Effect()
  getAttendees$ = this.actions$.pipe(
    ofType(AttendeesActionTypes.LoadAttendees),
    switchMap((action: LoadAttendees) =>
      this.eventService.getAttendees().pipe(
        map((attendees: Attendee[]) => new LoadAttendeesSuccess(attendees)),
        catchError(error => of(new LoadAttendeesFail(error)))
      )
    )
  );

  @Effect()
  addAttendee$ = this.actions$.pipe(
    ofType(AttendeesActionTypes.AddAttendee),
    switchMap((action: AddAttendee) =>
      this.eventService.addAttendee(action.payload).pipe(
        map((attendee: Attendee) => new AddAttendeeSuccess(attendee)),
        catchError(error => of(new AddAttendeeFail(error)))
      )
    )
  );

  @Effect()
  loadDiaryHealthActions$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((r: RouterNavigationAction) => ({
      url: r.payload.routerState.url,
      filterBy: r.payload.routerState.root.queryParams['filterBy']
    })),
    filter(({ url, filterBy }) => url.startsWith('/event')),
    map(({ filterBy }) => new FilterBy(filterBy))
  );
}
