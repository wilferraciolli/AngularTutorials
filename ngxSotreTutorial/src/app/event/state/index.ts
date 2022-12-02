import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from './../../state/state';
import { AttendeesEffects } from './attendees/attendees.effects';
import * as fromAttendees from './attendees/attendees.reducer';

export interface EventState {
  attendees: fromAttendees.State;
}

export interface State extends fromRoot.State {
  event: EventState;
}

export const reducers: ActionReducerMap<EventState> = {
  attendees: fromAttendees.reducer
};

export const effects: any[] = [AttendeesEffects];
