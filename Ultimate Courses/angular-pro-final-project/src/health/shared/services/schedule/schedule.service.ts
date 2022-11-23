import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import 'rxjs/add/operator/do';

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any[]> = this.date$
                                     .do((next: any) => this.store.set('date', next));

  constructor(
    private store: Store
  ) {
  }

  updateDate(date: Date) {
    // update the value of the behaviour subject so the store can be updated and subscribvers will listen to it
    this.date$.next(date);
  }
}
