import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    MealsComponent
  ]
})
export class MealsModule {
}
