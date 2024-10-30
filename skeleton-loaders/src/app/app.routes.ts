import { Routes } from '@angular/router';
import { AnimationListComponent } from './components/animation-list/animation-list.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { HomeComponent } from './components/home/home.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ShapeListComponent } from './components/shape-list/shape-list.component';
import { SkellyAlingListComponent } from './components/skelly-aling-list/skelly-aling-list.component';
import { SkellyHeaderListComponent } from './components/skelly-header-list/skelly-header-list.component';
import { SkellyLineListComponent } from './components/skelly-line-list/skelly-line-list.component';
import { SkellyParagraphListComponent } from './components/skelly-paragraph-list/skelly-paragraph-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'headers', component: SkellyHeaderListComponent },
  { path: 'paragraphs', component: SkellyParagraphListComponent },
  { path: 'lines', component: SkellyLineListComponent },
  { path: 'alignment', component: SkellyAlingListComponent },
  { path: 'images', component: ImageListComponent },
  { path: 'shapes', component: ShapeListComponent },
  { path: 'animation', component: AnimationListComponent },
  { path: 'cards', component: CardListComponent }
];
