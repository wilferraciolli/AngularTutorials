import { StartSpinner } from './spinner.actions';
import { reducer } from './spinner.reducer';

describe('SpinnerReducer', () => {
  it('should have initial state of false',  ()=> {
    const expected = { isOn: false };
    const action = { type: 'foo' } as any;

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should have a isOn set to true',  ()=> {
    const state = { isOn: false };
    const action = new StartSpinner();
    const expected = { isOn: true };

    expect(reducer(state, action)).toEqual(expected);
  });
});
