import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { ArchComponent } from './graphs/arch/arch.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { BarCharVerticalComponent } from './graphs/bar-char-vertical/bar-char-vertical.component';
import { BarChartVerticalWrapComponent } from './graphs/bar-chart-vertical-wrap/bar-chart-vertical-wrap.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchComponent,
    BarCharVerticalComponent,
    BarChartVerticalWrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,

    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
