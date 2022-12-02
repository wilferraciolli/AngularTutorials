import { Attendee } from '../../models';
import { AttendeesActions, AttendeesActionTypes } from './attendees.actions';

export interface State {
  attendees: Attendee[];
  loading: boolean;
}

export const intialState: State = {
  attendees: [],
  loading: false
};

export function reducer(state = intialState, action: AttendeesActions): State {
  switch (action.type) {
    case AttendeesActionTypes.LoadAttendees:
    {
    }

      break;

    default: {
      return state;
    }
  }
}
