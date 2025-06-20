import { Routes } from '@angular/router';
import { GiphyListComponent } from './giphy-list/giphy-list.component';
import { UnsplashListComponent } from './unsplash-list/unsplash-list.component';
import { ImageListComponent } from './image-list/image-list.component';

export const routes: Routes = [
  { path: 'giphy-list', component: GiphyListComponent },
  { path: 'unsplash-list', component: UnsplashListComponent },
  { path: 'image-list', component: ImageListComponent },
  { path: '', redirectTo: 'giphy-list', pathMatch: 'full' },
];
