import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ScheduleComponent
  ]
})
export class ScheduleModule {
}
