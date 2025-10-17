import { Routes } from '@angular/router';
import { DirectivesComponent } from './components/directives/directives.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ProjectionComponent } from './components/projections/projection/projection.component';
import { RoutingComponent } from './components/routing/routing.component';
import { ProviderListComponent } from './components/providers/provider-list/provider-list.component';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pipes', pathMatch: 'full' }, //default route
  { path: 'pipes', component: PipesComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'routing', component: RoutingComponent },
  { path: 'providers', component: ProviderListComponent },
  { path: 'projection', component: ProjectionComponent },
  { path: 'services', component: ServicesComponent },
  { path: '**', component: PipesComponent } // fallback
];
