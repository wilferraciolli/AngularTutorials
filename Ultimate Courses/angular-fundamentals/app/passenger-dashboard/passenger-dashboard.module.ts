import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  bootstrap: [],
  declarations: [
    PassengerDashboardComponent
  ],
  exports: [
    PassengerDashboardComponent
  ]
})
export class PassengerDashboardModule {
}
