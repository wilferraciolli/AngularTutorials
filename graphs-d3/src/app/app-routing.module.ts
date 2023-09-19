import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArchComponent} from "./graphs/arch/arch.component";
import {BarCharVerticalComponent} from "./graphs/bar-char-vertical/bar-char-vertical.component";
import {BarChartVerticalWrapComponent} from "./graphs/bar-chart-vertical-wrap/bar-chart-vertical-wrap.component";

const routes: Routes = [
  { path: 'graphs/arch', component: ArchComponent },
  { path: 'graphs/bar', component: BarChartVerticalWrapComponent },
  { path: '**', component: ArchComponent },
  { path: '',   redirectTo: '/graphs/arch', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
