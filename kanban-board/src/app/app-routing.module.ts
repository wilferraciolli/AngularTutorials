import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardsComponent} from "./kanban/boards/boards.component";
import {BoardDetailsComponent} from "./kanban/board-details/board-details.component";

const routes: Routes = [
  { path: 'boards', component: BoardsComponent },
  { path: 'boardDetails', component: BoardDetailsComponent },
  { path: '',   redirectTo: '/boardDetails', pathMatch: 'full' },
  { path: '**', component: BoardsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
