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
        (change)="changeDate($event)">
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
      this.scheduleService.schedule$.subscribe()
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }
}
