import { signalStore, withState } from '@ngrx/signals';
import { Todo } from '../models/todo.model';

export type TodosFilter = 'all' | 'pending' | 'completed';

// define the type of the state
type TodoState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter
  // error: string;
};

// define the initial state of the store
const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all'
};

// define the store itself, it starts with capital Letter as it is injectable
// this can be added as a provider to a component or added to the root as it can be injected anywhere
// IMPORTANT this todo store will make every property on this store a signal
export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);

