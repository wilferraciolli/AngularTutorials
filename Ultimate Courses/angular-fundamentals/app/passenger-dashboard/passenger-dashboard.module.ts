import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-details/passenger-detail.component';
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';
import { PassengerDashboardService } from './passernger-dashboar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    PassengerDashboardComponent
  ],
  declarations: [
    PassengerDashboardComponent,
    PassengerCountComponent,
    PassengerDetailComponent
  ],
  providers: [
    PassengerDashboardService
  ]
})
export class PassengerDashboardModule {
}
