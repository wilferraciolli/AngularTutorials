import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async">
      </schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private mealService: MealsService,
    private workoutsService: WorkoutsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    // subscribe to properties on the store
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  public changeSection(event: any) {
    // console.log('Event received when section was changed ', event);
    this.open = true;

    /*this event will be something like assigned
    assigned: [],
    data: {},
    day: Wed Nov 23 2022 10:17:37 GMT+0000 (Greenwich Mean Time)
    section: lunch,
    type: 'meals'
    */
    this.scheduleService.selectSection(event);
  }
}
