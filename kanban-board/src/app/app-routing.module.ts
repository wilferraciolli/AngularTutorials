import {inject, NgModule} from '@angular/core';
import {provideRouter, RouterModule, Routes, withComponentInputBinding} from '@angular/router';
import {BoardsComponent} from "./kanban/boards/boards.component";
import {BoardDetailsComponent} from "./kanban/board-details/board-details.component";
import {BoardDetailsResolver} from "./kanban/board-details/board-details.resolver";

const routes: Routes = [
  {path: 'boards', component: BoardsComponent},
  {
    path: 'boardDetails',
    component: BoardDetailsComponent,
    resolve: {
      "toDoItems": () => inject(BoardDetailsResolver).resolveToDo(),
      "doingItems": () => inject(BoardDetailsResolver).resolveDoing(),
      "testingItems": () => inject(BoardDetailsResolver).resolveTesting(),
      "singOffItems": () => inject(BoardDetailsResolver).resolveSignOff(),
      "doneItems": () => inject(BoardDetailsResolver).resolveDone(),
    }
  },
  {path: '', redirectTo: '/boardDetails', pathMatch: 'full'},
  {path: '**', component: BoardsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule {
}
