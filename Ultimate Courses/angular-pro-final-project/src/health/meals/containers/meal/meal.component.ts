import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">

          <span *ngIf="meal$ | async as meal; else title;">
            {{meal.name ? 'Edit' : 'Create'}} meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>

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
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // get the meals from the store to work out whether we are creating or editing a meal
    this.subscription = this.mealsService.meals$.subscribe();

    // get the id from the route to work out whether the route is for update/create
    this.meal$ = this.route.params
                     .switchMap(param => this.mealsService.getMeal(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
