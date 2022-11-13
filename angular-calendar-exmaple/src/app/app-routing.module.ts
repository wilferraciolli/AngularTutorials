import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyViewComponent } from './day-view/daily-view.component';
import { HomeComponent } from './home/home.component';
import { MonthlyViewComponent } from './montly-view/monthly-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'monthly', component: MonthlyViewComponent },
  { path: 'weekly', component: WeeklyViewComponent },
  { path: 'daily', component: DailyViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
