import { Routes } from '@angular/router';
import { DirectivesComponent } from './components/directives/directives.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { RoutingComponent } from './components/routing/routing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pipes', pathMatch: 'full' }, //default route
  { path: 'pipes', component: PipesComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'routing', component: RoutingComponent },
  { path: 'providers', component: ProvidersComponent },
  { path: '**', component: PipesComponent } // fallback
];
