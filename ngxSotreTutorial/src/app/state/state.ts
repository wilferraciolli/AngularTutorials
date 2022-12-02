
import * as fromSpinner from './spinner/spinner.reducer';

// create global interface to export the inner interfaces from different lazily modules
export interface State {
  spinner: fromSpinner.State
}
