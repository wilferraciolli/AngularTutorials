import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArchComponent} from "./graphs/arch/arch.component";
import {BarChartVerticalWrapComponent} from "./graphs/bar-chart-vertical-wrap/bar-chart-vertical-wrap.component";
import {HistogramChartWrapComponent} from "./graphs/histogram-chart-wrap/histogram-chart-wrap.component";
import {DonutChartWrapComponent} from "./graphs/donut-chart-wrap/donut-chart-wrap.component";
import {ChartListComponent} from "./graphs/multiple/chart-list/chart-list.component";

const routes: Routes = [
  { path: 'graphs/arch', component: ArchComponent },
  { path: 'graphs/donut', component: DonutChartWrapComponent },
  { path: 'graphs/histogram', component: HistogramChartWrapComponent },
  { path: 'graphs/list', component: ChartListComponent },
  { path: 'graphs/barVertical', component: BarChartVerticalWrapComponent },
  { path: '**', component: ArchComponent },
  { path: '', redirectTo: '/graphs/arch', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
