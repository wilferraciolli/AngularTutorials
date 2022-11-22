import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/img/workout.svg">

          <span *ngIf="workout$ | async as workout; else title;">
            {{workout.name ? 'Edit' : 'Create'}} workout
          </span>
          <ng-template #title>
            Loading...
          </ng-template>

        </h1>
      </div>

      <!-- Workout form -->
      <div *ngIf="workout$ | async as workout; else loading;">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        >
        </workout-form>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg"
               alt="">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // get the workouts from the store to work out whether we are creating or editing a workout
    this.subscription = this.workoutsService.workouts$.subscribe();

    // get the id from the route to work out whether the route is for update/create
    this.workout$ = this.route.params
                     .switchMap(param => this.workoutsService.getWorkout(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // handle the event ommitted bvy the output of the form, then add to the database
  public async addWorkout(event: Workout) {
    // console.log('Workout added ', event);
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }


  public async updateWorkout(event: Workout) {
    // get the key from the router url
    const key = this.route.snapshot.params.id;

    this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  public removeWorkout(event: Workout) {
    // get the key from the router url
    const key = this.route.snapshot.params.id;

    this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  private backToWorkouts() {
    this.router.navigate(['workouts']);
  }

}
