import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardsComponent} from "./kanban/boards/boards.component";

const routes: Routes = [
  { path: 'boards', component: BoardsComponent },
  { path: '',   redirectTo: '/boards', pathMatch: 'full' },
  { path: '**', component: BoardsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
