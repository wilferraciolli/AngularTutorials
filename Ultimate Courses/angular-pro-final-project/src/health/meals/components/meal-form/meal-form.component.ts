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
import { Meal } from '../../../shared/services/meals/meals.service';


@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <!-- name of the meal -->
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input type="text"
                   placeholder="E.g. breakfast"
                   formControlName="name">

            <div class="error"
                 *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>

        <!-- form array for ingredients -->
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button type="button"
                    class="meal-form__add"
                    (click)="addIngredient()">
              <img src="/img/add-white.svg">
              Add food
            </button>
          </div>

          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; let i = index;">
              <input [formControlName]="i"
                     placeholder="e.g Eggs">
              <span class="meal-form__remove"
                    (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <!-- actions based on create/update -->
        <div class="meal-form__submit">
          <div>
            <button type="button"
                    class="button"
                    *ngIf="!exists"
                    (click)="createMeal()">
              Create meal
            </button>

            <button type="button"
                    class="button"
                    *ngIf="exists"
                    (click)="updateMeal()">
              Save
            </button>

            <a class="button button--cancel"
               [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <!-- Delete meal -->
          <div class="meal-form__delete"
               *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button type="button"
                      class="confirm"
                      (click)="removeMeal()">
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
export class MealFormComponent implements OnChanges {

  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();
  @Output()
  update = new EventEmitter<Meal>();
  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    // check that the meal exists so it is an update
    if (this.meal && this.meal.name) {
      this.exists = true;
      // empty ingredients from the form as it is not populated correctly by default
      this.emptyIngredients();

      // populate the form with the current values
      const value = this.meal;
      this.form.patchValue(value);

      // populate the ingredients from scratch -- this is because Angular cannot patch a FormArray
      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  get required() {
    return this.form.get('name').hasError('required') &&
      this.form.get('name').touched;
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public createMeal() {
    // console.log('The value of the form is ', this.form.value);
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  public removeMeal() {
    this.remove.emit(this.form.value);
  }

  public addIngredient() {
    // add new place to hold ingredients on the form
    this.ingredients.push(new FormControl(''));
  }

  public removeIngredient(index: number) {
    // remove an ingredient from the array
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled != this.toggled;
  }


  private emptyIngredients() {
    // get the list of ingredients
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }
}
