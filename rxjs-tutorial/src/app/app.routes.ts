import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'fromEvent', loadComponent: () => import('./components/from-event/from-event.component').then(m => m.FromEventComponent)
  },
  {
    path: 'interval', loadComponent: () => import('./components/interval/interval.component').then(m => m.IntervalComponent)
  },
  {
    path: 'debounce', loadComponent: () => import('./components/debounce-time/debounce-time.component').then(m => m.DebounceTimeComponent)
  }
];
