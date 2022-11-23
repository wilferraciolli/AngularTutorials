import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,

  [key: string]: any // key look up functionality
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  // when the date was updated, then work out the start and end dates so the data can be fetched
  schedule$: Observable<ScheduleItem[]> = this.date$
                                              .do((next: any) => this.store.set('date', next))
                                              .map((day: any) => {

                                                // get data from firease
                                                const startAt = (
                                                  new Date(day.getFullYear(), day.getMonth(), day.getDate())
                                                ).getTime();
                                                const endAt = (
                                                  new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
                                                ).getTime() - 1;

                                                return { startAt, endAt };
                                              })
                                              .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
                                              .map((data: any) => {
                                                // map data returned from firebase
                                                const mapped: ScheduleList = {};

                                                for (const prop of data) {
                                                  if (!mapped[prop.section]) {
                                                    mapped[prop.section] = prop;
                                                  }
                                                }

                                                return mapped;
                                              })
                                              .do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  updateDate(date: Date) {
    // update the value of the behaviour subject so the store can be updated and subscribvers will listen to it
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    // go to firebase to get info, add query params to filter the data
    return this.db.list(`schedule/${ this.uid }`,
      {
        query: {
          orderByChild: 'timestamp',
          startAt,
          endAt
        }
      });
  }
}
