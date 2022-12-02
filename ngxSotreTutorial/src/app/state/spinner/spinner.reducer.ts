export function reducer(state = { isOn: false }, action: { type: any; }) {
  switch (action.type) {
    case 'startSpinner': {
      return {
        isOn: true
      };
    }

    case 'stopSpinner': {
      return {
        isOn: false
      };
    }

    default:
      return state;
  }
}
