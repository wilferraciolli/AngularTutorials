import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// create routes for other modules
const routes: Routes = [
  // Add a path to the demo modules so it can be used for POC
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
  { path: '**', redirectTo: 'demo' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
