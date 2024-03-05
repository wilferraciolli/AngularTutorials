import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';

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
  // state
  withState(initialState),
  // methods to manipulate the store
  withMethods((store, todoService = inject(TodosService)) => ({
      async loadAll() {
        patchState(store, { loading: true });

        const todos = await todoService.getTodos();

        patchState(store, { todos, loading: false });
      }
    })
  )
);

