import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { Meal, MealsService } from '../../../shared/services/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
      {{meals$ | async | json}}
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
