import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-details/passenger-detail.component';
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  bootstrap: [],
  declarations: [
    PassengerDashboardComponent,
    PassengerCountComponent,
    PassengerDetailComponent
  ],
  exports: [
    PassengerDashboardComponent
  ]
})
export class PassengerDashboardModule {
}
