import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { interval, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-interval',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit, OnDestroy {
  public value: string = '';

  private intervalSubscription$: Subscription = new Subscription();

  public ngOnInit(): void {
    this.intervalSubscription$ = interval(1000)
    .pipe(take(10))
    .subscribe((data: number) =>
      this.value = `The value is ${ data }`);
  }

  public ngOnDestroy(): void {
    this.intervalSubscription$.unsubscribe();
  }

}
