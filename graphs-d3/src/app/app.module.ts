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
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { HistogramChartWrapComponent } from './graphs/histogram-chart-wrap/histogram-chart-wrap.component';
import { HistogramChartComponent } from './graphs/histogram-chart/histogram-chart.component';
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import { DonutChartComponent } from './graphs/donut-chart/donut-chart.component';
import { DonutChartWrapComponent } from './graphs/donut-chart-wrap/donut-chart-wrap.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchComponent,
    BarCharVerticalComponent,
    BarChartVerticalWrapComponent,
    PieChartComponent,
    HistogramChartWrapComponent,
    HistogramChartComponent,
    DonutChartComponent,
    DonutChartWrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
