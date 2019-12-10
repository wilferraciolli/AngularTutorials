import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// create routes for other modules
const routes: Routes = [
  { path: 'contactmanager', loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule' },
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' }, // Add a path to the demo modules so it can be used for POC
  { path: '**', redirectTo: 'contactmanager' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
