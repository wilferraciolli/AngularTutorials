import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        {
          path: 'products',
          canLoad: [AuthGuard],  // make sure to use canLoad instead of canActivate to make sure that module will only be loaded if passes reqs
          loadChildren: () =>
            import('./products/product.module')
              .then(m => m.ProductModule)
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ]
      // { enableTracing: true } // this logs the routing events, comment out
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
