import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span>Create meal</span>
        </h1>
      </div>

      <!-- Meal form -->
      <div>
        <meal-form
          (create)="addMeal($event)">
        </meal-form>
      </div>
    </div>
  `
})
export class MealComponent {
  constructor(
    private mealsService: MealsService,
    private router: Router
  ) {
  }

  // handle the event ommitted bvy the output of the form, then add to the database
  public async addMeal(event: Meal) {
    // console.log('Meal added ', event);
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }
}
