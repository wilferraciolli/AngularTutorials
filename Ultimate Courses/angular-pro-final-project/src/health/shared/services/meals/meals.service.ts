import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import 'rxjs/add/operator/do';

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
}
