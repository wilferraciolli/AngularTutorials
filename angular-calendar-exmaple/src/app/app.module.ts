import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MonthlyViewComponent } from './montly-view/monthly-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { DayViewComponent } from './day-view/day-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthlyViewComponent,
    WeeklyViewComponent,
    DayViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
