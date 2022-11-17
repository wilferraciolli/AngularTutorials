/*
Sore used to hold the state of the entire application

to add data
store.set('todos', [{}])

to get data
store.select('store')
 */


import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './state';

const state: State = {
  playlist: undefined
};

export class Store {

  // create a subject so components can subscribe to it
  private subject = new BehaviorSubject<State>(state);

  // avoid notifying subscribers when the value is updated with the old value
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    // update the subject and notify subscribers
    this.subject.next({
      // merge current to the new value to set and use immutability
      ...this.value, [name]: state //Eg store.set('todos', [{}])
    });
  }
}
