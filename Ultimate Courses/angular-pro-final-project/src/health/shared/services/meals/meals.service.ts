import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

export interface Meal {
  name: string,
  ingredients: string,
  timestamp: string,
  $key: string,
  $exists: () => boolean,
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list(`meals/${ this.uid }`)
                                   .do(next => this.store.set('meals', next));

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

  public getMeal(key: string) {
    if (!key) {
      // if no key is present then ignore
      return Observable.of({});
    }

    // check on the store whether the updated meal is already there
    return this.store.select<Meal[]>('meals')
               .filter(Boolean)// stop the stream if empty
               .map(meals => meals.find((meal: Meal) => meal.$key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${ this.uid }`)
               .push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${ this.uid }/${key}`)
               .update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${ this.uid }`)
               .remove(key);
  }


}
