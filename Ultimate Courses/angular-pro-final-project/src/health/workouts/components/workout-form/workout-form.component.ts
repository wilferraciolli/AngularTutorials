import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
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
                   placeholder="E.g. breakfast"
                   formControlName="name">

            <div class="error"
                 *ngIf="required">
              Workout name is required
            </div>
          </label>
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
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    // check that the workout exists so it is an update

  }

  get required() {
    return this.form.get('name').hasError('required') &&
      this.form.get('name').touched;
  }

  // get ingredients(): FormArray {
  //   return this.form.get('ingredients') as FormArray;
  // }

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

  // public addIngredient() {
  //   // add new place to hold ingredients on the form
  //   this.ingredients.push(new FormControl(''));
  // }
  //
  // public removeIngredient(index: number) {
  //   // remove an ingredient from the array
  //   this.ingredients.removeAt(index);
  // }

  toggle() {
    this.toggled != this.toggled;
  }

  // private emptyIngredients() {
  //   // get the list of ingredients
  //   while (this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }
}
