import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'toSignal', loadComponent: () => import('./components/to-signal/to-signal.component').then(m => m.ToSignalComponent)
  },
  {
    path: 'toObservable', loadComponent: () => import('./components/to-observable/to-observable.component').then(m => m.ToObservableComponent)
  },
];
