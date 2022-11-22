import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div>
      <!--      {{workouts$ | async | json}}-->
      <div class="workouts">
        <div class="workouts__title">
          <h1>
            <img src="/img/workout.svg"
                 alt="food">
            Your workouts
          </h1>
          <a class="btn__add"
             [routerLink]="['../workouts/new']">
            <img src="/img/add-white.svg"
                 alt="">
            New workout
          </a>
        </div>

        <!-- display a list of workouts -->
        <div *ngIf="workouts$ | async as workouts; else loading;">
          <!-- if empty -->
          <div class="message"
               *ngIf="!workouts.length">
            <img src="/img/face.svg">
            No workouts, add a new workout to start
          </div>

          <!-- display workouts -->
          <list-item *ngFor="let workout of workouts;"
                     [item]="workout"
                     (remove)="removeWorkout($event)">
          </list-item>

        </div>

        <!-- project the loading from the statement above -->
        <ng-template #loading>
          <div class="message">
            <img src="/img/loading.svg">
            Fetching workouts...
          </div>
        </ng-template>

      </div>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeWorkout(event: Workout) {
    // console.log('Removed event received ', event);
    this.workoutsService.removeWorkout(event.$key);
  }
}
