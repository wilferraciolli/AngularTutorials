import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyViewComponent } from './day-view/daily-view.component';
import { MonthlyViewComponent } from './montly-view/monthly-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';

const routes: Routes = [
  { path: 'monthly', component: MonthlyViewComponent },
  { path: 'weekly', component: WeeklyViewComponent },
  { path: 'daily', component: DailyViewComponent },
  { path: '', redirectTo: '/monthly', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
