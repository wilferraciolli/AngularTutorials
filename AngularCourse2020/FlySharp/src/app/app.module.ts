import {HomeComponent} from './home/home.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BuyFlightComponent} from './buy-flight/buy-flight.component';
import {FlightsService} from './flights/flights.service';
import {PaymentComponent} from './payment/payment.component';
import {FlightFilterComponent} from './flight-filter/flight-filter.component';
import {AccountComponent} from './account/account.component';
import {MyFlightsComponent} from './my-flights/my-flights.component';
import {Route, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'buy', component: BuyFlightComponent},
  {path: 'buy/:origin', component: BuyFlightComponent},
  {path: 'myflights', component: MyFlightsComponent},
  {path: 'account', component: AccountComponent}
];

@NgModule({
  declarations: [
    AppComponent, HomeComponent, BuyFlightComponent, PaymentComponent, FlightFilterComponent, AccountComponent, MyFlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FlightsService],
  bootstrap: [AppComponent],

})
export class AppModule {
}


