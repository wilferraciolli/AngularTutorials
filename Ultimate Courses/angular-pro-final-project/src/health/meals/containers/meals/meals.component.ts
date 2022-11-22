import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
      <!--      {{meals$ | async | json}}-->
      <div class="meals">
        <div class="meals__title">
          <h1>
            <img src="/img/food.svg"
                 alt="food">
            Your meals
          </h1>
          <a class="btn__add"
             [routerLink]="['../meals/new']">
            <img src="/img/add-white.svg"
                 alt="">
            New meal
          </a>
        </div>

        <!-- display a list of melas -->
        <div *ngIf="meals$ | async as meals; else loading;">
          <!-- if empty -->
          <div class="message"
               *ngIf="!meals.lengh">
            <img src="/img/face.svg">
            No meals, add a new meal to start
          </div>

          <!-- display meals -->

        </div>

        <!-- project the loading from the statement above -->
        <ng-template #loading>
          <div class="message">
            <img src="/img/loading.svg">
            Fetching meals...
          </div>
        </ng-template>

      </div>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
