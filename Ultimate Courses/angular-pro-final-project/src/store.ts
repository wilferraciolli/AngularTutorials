import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from './auth/shared/services/auth/auth.service';
import { Meal } from './health/shared/services/meals/meals.service';
import { ScheduleItem } from './health/shared/services/schedule/schedule.service';
import { Workout } from './health/shared/services/workouts/workouts.service';

export interface State {
  user: User;
  date: Date;
  schedule: ScheduleItem[];
  meals: Meal[];
  workouts: Workout[];
  [key: string]: any
}

const STATE: State = {
  user: undefined,
  date: undefined,
  schedule: undefined,
  meals: undefined,
  workouts: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(STATE);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
