import { SpinnerActions, SpinnerActionTypes } from './spinner.actions';

export interface State {
  isOn: boolean;
}

export const initialState: State = {
  isOn: false
};

export function reducer(state = initialState, action: SpinnerActions): State {
  // switch on the type value of the action, this is defined in an enum
  switch (action.type) {
    case SpinnerActionTypes.StartSpinner: {
      return {
        isOn: true
      };
    }

    case SpinnerActionTypes.StopSpinner: {
      return {
        isOn: false
      };
    }

    default:
      return state;
  }
}
