import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyFlightComponent } from './buy-flight/buy-flight.component';
import {FlightsService} from './flights/flights.service';
import {PaymentComponent} from './payment/payment.component';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';
import { MyFlightsComponent } from './my-flights/my-flights.component';
import {AccountsModule} from './accounts/accounts.module';
import { CurrencyConversionPipe } from './currency-conversion/currency-conversion.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeDirective } from './time.directive';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, BuyFlightComponent, PaymentComponent, FlightFilterComponent, MyFlightsComponent, CurrencyConversionPipe, TimeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FlightsService],
  bootstrap: [AppComponent],

})
export class AppModule { }
