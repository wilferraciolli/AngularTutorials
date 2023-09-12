import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeoLocationComponent } from './geo-location/geo-location.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoLocationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
