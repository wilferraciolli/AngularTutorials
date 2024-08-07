import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Attendee } from '../../../models';
import { AttendeesActions, AttendeesActionTypes } from './attendees.actions';

export interface State extends EntityState<Attendee> {
  loading: boolean;
  error: any;
  filterBy: string;
}

const adapter: EntityAdapter<Attendee> = createEntityAdapter<Attendee>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  filterBy: 'all'
});

export function reducer(state = initialState, action: AttendeesActions): State {
  switch (action.type) {
    case AttendeesActionTypes.LoadAttendees: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: null
      });
    }

    case AttendeesActionTypes.LoadAttendeesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: null
      });
    }

    case AttendeesActionTypes.LoadAttendeesFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload
      });
    }

    case AttendeesActionTypes.AddAttendeeSuccess: {
      return adapter.addOne(action.payload, { ...state, error: null });
    }

    case AttendeesActionTypes.AddAttendeeFail: {
      return { ...state, error: action.payload };
    }

    case AttendeesActionTypes.FilterBy: {
      return { ...state, filterBy: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
