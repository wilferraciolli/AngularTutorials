import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: string,
  $key: string,
  $exists: () => boolean,
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]> = this.db.list(`workouts/${ this.uid }`)
                                   .do(next => this.store.set('workouts', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    // get current user logged in
    return this.authService.user.uid;
  }

  public getWorkout(key: string) {
    if (!key) {
      // if no key is present then ignore
      return Observable.of({});
    }

    // check on the store whether the updated meal is already there
    return this.store.select<Workout[]>('workouts')
               .filter(Boolean)// stop the stream if empty
               .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${ this.uid }`)
               .push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${ this.uid }/${key}`)
               .update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${ this.uid }`)
               .remove(key);
  }
}
