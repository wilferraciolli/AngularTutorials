import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { ProductSalesChartComponent } from './charts/product-sales-chart/product-sales-chart.component';
import { SalesTrafficChartComponent } from './charts/sales-traffic-chart/sales-traffic-chart.component';
import { AnnualSalesChartComponent } from './charts/annual-sales-chart/annual-sales-chart.component';
import { StoreSessionsChartComponent } from './charts/store-sessions-chart/store-sessions-chart.component';
import { LineChartComponent } from './charts/templates/line-chart/line-chart.component';
import { PieChartComponent } from './charts/templates/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/templates/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/templates/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './charts/templates/radar-chart/radar-chart.component';
import { PolarAreaChartComponent } from './charts/templates/polar-area-chart/polar-area-chart.component';
import { BubbleChartComponent } from './charts/templates/bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './charts/templates/scatter-chart/scatter-chart.component';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    ProductSalesChartComponent,
    SalesTrafficChartComponent,
    AnnualSalesChartComponent,
    StoreSessionsChartComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PolarAreaChartComponent,
    BubbleChartComponent,
    ScatterChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
