import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SkellyHeaderListComponent } from './components/skelly-header-list/skelly-header-list.component';
import { SkellyParagraphListComponent } from './components/skelly-paragraph-list/skelly-paragraph-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'headers', component: SkellyHeaderListComponent },
  { path: 'paragraphs', component: SkellyParagraphListComponent }
];
