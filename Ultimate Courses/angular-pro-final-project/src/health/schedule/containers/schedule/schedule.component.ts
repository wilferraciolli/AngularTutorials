import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';

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
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');

    // subscribe to properties on the store
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe()
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
