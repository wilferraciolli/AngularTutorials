import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Workout } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <!-- name of the workout -->
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input type="text"
                   [placeholder]="placeholder"
                   formControlName="name">

            <div class="error"
                 *ngIf="required">
              Workout name is required
            </div>
          </label>

          <label>
            <h3>Type</h3>
            <workout-type formControlName="type">
            </workout-type>
          </label>
        </div>

        <!-- custom work out based on type -->
        <div class="workout-form__details">
          <!-- When type is endurance -->
          <div *ngIf="form.get('type').value === 'strength'">
            <div class="workout-form__fields"
                 formGroupName="strength">
              <label>
                <h3>Reps</h3>
                <input type="number"
                       formControlName="reps">
              </label>
              <label>
                <h3>Set</h3>
                <input type="number"
                       formControlName="sets">
              </label>
              <label>
                <h3>Weights
                  <span>(kg)</span>
                </h3>
                <input type="number"
                       formControlName="weight">
              </label>
            </div>
          </div>

          <!-- When type is endurance -->
          <div *ngIf="form.get('type').value === 'endurance'">
            <div class="workout-form__fields"
                 formGroupName="endurance">
              <label>
                <h3>Distance
                  <span>(km)</span>
                </h3>
                <input type="number"
                       formControlName="distance">
              </label>
              <label>
                <h3>Duration
                  <span>(minutes)</span>
                </h3>
                <input type="number"
                       formControlName="duration">
              </label>
            </div>
          </div>
        </div>

        <!-- actions based on create/update -->
        <div class="workout-form__submit">
          <div>
            <button type="button"
                    class="button"
                    *ngIf="!exists"
                    (click)="createWorkout()">
              Create workout
            </button>

            <button type="button"
                    class="button"
                    *ngIf="exists"
                    (click)="updateWorkout()">
              Save
            </button>

            <a class="button button--cancel"
               [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <!-- Delete workout -->
          <div class="workout-form__delete"
               *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button type="button"
                      class="confirm"
                      (click)="removeWorkout()">
                Yes
              </button>
              <button type="button"
                      class="cancel"
                      (click)="toggle()">
                No
              </button>
            </div>
            <button class="button button--delete"
                    type="button"
                    (click)="toggle()">
              Delete
            </button>
          </div>

        </div>
      </form>
    </div>
  `
})
export class WorkoutFormComponent implements OnChanges {

  toggled = false;
  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();
  @Output()
  update = new EventEmitter<Workout>();
  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength', Validators.required],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    // check that the workout exists so it is an update
    if (this.workout && this.workout.name){
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get placeholder() {
    return `    e.g. ${ this.form.get('type').value === 'strength' ? 'Benchpress' : 'Threadmill' }    `;
  }

  get required() {
    return this.form.get('name').hasError('required') &&
      this.form.get('name').touched;
  }

  public createWorkout() {
    // console.log('The value of the form is ', this.form.value);
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  public removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled != this.toggled;
  }
}
